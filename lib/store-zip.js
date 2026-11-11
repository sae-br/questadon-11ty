const fs = require("fs");
const zlib = require("zlib");

// A tiny ZIP writer for the "Download all" buttons, so the site doesn't need
// a zip dependency. Files are stored as-is, without compression: the maps are
// PNG/JPG, which are already compressed, so squeezing them again saves nothing.
//
// zipSize() gives the exact size of the finished file without building it, so
// the page can show the size before the zip is written.

const LOCAL_HEADER = 30;
const CENTRAL_HEADER = 46;
const END_RECORD = 22;

// entries: [{ name: "map-rink.png", size: 1234 }]
function zipSize(entries) {
  return entries.reduce((total, { name, size }) => {
    const nameBytes = Buffer.byteLength(name);
    return total + LOCAL_HEADER + CENTRAL_HEADER + 2 * nameBytes + size;
  }, END_RECORD);
}

function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

// entries: [{ name: "map-rink.png", path: "/abs/path/map-rink.png" }]
function writeZip(outPath, entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const entry of entries) {
    const data = fs.readFileSync(entry.path);
    const name = Buffer.from(entry.name);
    const crc = zlib.crc32(data);
    const { time, day } = dosDateTime(fs.statSync(entry.path).mtime);

    const local = Buffer.alloc(LOCAL_HEADER);
    local.writeUInt32LE(0x04034b50, 0); // local file header signature
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // flags: filename is UTF-8
    local.writeUInt16LE(0, 8); // method: stored
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(day, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18); // compressed size
    local.writeUInt32LE(data.length, 22); // uncompressed size
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28); // extra field length
    locals.push(local, name, data);

    const central = Buffer.alloc(CENTRAL_HEADER);
    central.writeUInt32LE(0x02014b50, 0); // central directory signature
    central.writeUInt16LE(20, 4); // version made by
    central.writeUInt16LE(20, 6); // version needed
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(day, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    // extra length, comment length, disk, internal attrs, external attrs: all 0
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += LOCAL_HEADER + name.length + data.length;
  }

  const centralSize = centrals.reduce((sum, buf) => sum + buf.length, 0);
  const end = Buffer.alloc(END_RECORD);
  end.writeUInt32LE(0x06054b50, 0); // end of central directory signature
  end.writeUInt16LE(entries.length, 8); // entries on this disk
  end.writeUInt16LE(entries.length, 10); // entries total
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16); // where the central directory starts

  fs.writeFileSync(outPath, Buffer.concat([...locals, ...centrals, end]));
}

module.exports = { zipSize, writeZip };

import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';
import db from '../db.ts';

class Color extends Model {
  static table = 'colors';
  static timestamps = true;

  static fields = {
    hex_value: DataTypes.string(10),
  };
}

db.link([Color]);
db.sync();

export default Color;

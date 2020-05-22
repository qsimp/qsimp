import * as assert from 'assert'
import { convert } from './units';

describe("units", function () {
    describe("converts", function () {
        it("converts from Joules to eV", function () {
            assert.ok(Math.abs(convert(1.602E-18, "J", "eV") - 10) < 1E-2);
        });
    })
});

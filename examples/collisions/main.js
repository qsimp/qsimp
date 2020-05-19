for (var _i = 0, _a = [1, 5, 10, 15]; _i < _a.length; _i++) {
    var m1 = _a[_i];
    for (var _b = 0, _c = [1, 5, 10, 15]; _b < _c.length; _b++) {
        var m2 = _c[_b];
        if (m1 == m2) {
            continue;
        }
        var v1 = 5;
        var v2 = -5;
        // for (let v1 of [1, 5, 10, 15]) {
        //     for (let v2 of [-1, -5, -10, -15]) {
        //         if (v1 == v2) {
        //             continue
        //         }
        //         let m1 = 5
        //         let m2 = 5
        var momentum = m1 * v1 + m2 * v2;
        var kinetic = (.5 * m1 * v1 * v1) + (.5 * m2 * v2 * v2);
        var a = (m2 * m1 * m1) + (m2 * m2 * m1);
        var b = (-2 * momentum * m1 * m2) / a;
        var c = ((momentum * momentum * m2) - (2 * m2 * m2 * kinetic)) / a;
        a = 1;
        var quadratic1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        var quadratic2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        var v2_1 = (momentum - m1 * quadratic1) / m2;
        var v2_2 = (momentum - m1 * quadratic2) / m2;
        console.log("| ", m1, " | ", v1, " | ", m2, " | ", v2, " | ", momentum, " | ", kinetic, " | ", b.toFixed(2), " | ", c.toFixed(2), " | ", quadratic1.toFixed(2), quadratic2.toFixed(2), "|", v2_1.toFixed(2), v2_2.toFixed(2), "|");
    }
}

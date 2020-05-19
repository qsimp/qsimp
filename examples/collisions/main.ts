for (let m1 of [1, 5, 10, 15]) {
    for (let m2 of [1, 5, 10, 15]) {
        if (m1 == m2) {
            continue
        }

        let v1 = 5
        let v2 = -5

        // for (let v1 of [1, 5, 10, 15]) {
        //     for (let v2 of [-1, -5, -10, -15]) {
        //         if (v1 == v2) {
        //             continue
        //         }

        //         let m1 = 5
        //         let m2 = 5

        let momentum = m1 * v1 + m2 * v2
        let kinetic = (.5 * m1 * v1 * v1) + (.5 * m2 * v2 * v2)

        let a = (m2 * m1 * m1) + (m2 * m2 * m1)
        let b = (-2 * momentum * m1 * m2) / a
        let c = ((momentum * momentum * m2) - (2 * m2 * m2 * kinetic)) / a
        a = 1

        let quadratic1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        let quadratic2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)

        let v2_1 = (momentum - m1 * quadratic1) / m2
        let v2_2 = (momentum - m1 * quadratic2) / m2


        console.log("| ", m1, " | ", v1, " | ", m2, " | ", v2, " | ", momentum, " | ", kinetic, " | ", b.toFixed(2), " | ", c.toFixed(2), " | ", quadratic1.toFixed(2), quadratic2.toFixed(2), "|", v2_1.toFixed(2), v2_2.toFixed(2), "|")
    }
}
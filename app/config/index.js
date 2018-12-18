const Assets = {
    images: {
        small: {
            x: require('../assets/images/x-small/x-small.png'),
            o: require('../assets/images/o-small/o-small.png'),
        },

        big: {
            x: [
                require("../assets/images/x1/x1.png"),
                require("../assets/images/x2/x2.png"),
                require("../assets/images/x3/x3.png"),
                require("../assets/images/x4/x4.png"),
            ],
            o: [
                require("../assets/images/o1/o1.png"),
                require("../assets/images/o2/o2.png"),
                require("../assets/images/o3/o3.png"),
                require("../assets/images/o4/o4.png"),
            ]
        },

        button: {
            reset: require("../assets/images/reset/reset.png"),
        },
    }
}

export {
    Assets
}
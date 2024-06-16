const Bus = require('../models/buses');
const busData = [
    {
        name: "EasyCoach",
        from: "NAIROBI",
        to: "MOMBASA",
        time: "08:00 AM",
        price: 1500,
        remainingSeats: 25
    },
    {
        name: "GreenLine",
        from: "NAIROBI",
        to: "MOMBASA",
        time: "09:30 AM",
        price: 1400,
        remainingSeats: 20
    },
    {
        name: "EnaCoach",
        from: "NAIROBI",
        to: "MOMBASA",
        time: "11:00 AM",
        price: 1600,
        remainingSeats: 18
    },
    {
        name: "Guardian Angel",
        from: "NAIROBI",
        to: "MOMBASA",
        time: "01:00 PM",
        price: 1550,
        remainingSeats: 22
    },
    {
        name: "Transline",
        from: "NAIROBI",
        to: "MOMBASA",
        time: "03:00 PM",
        price: 1450,
        remainingSeats: 15
    },
    {
        name: "EasyCoach",
        from: "MOMBASA",
        to: "KISUMU",
        time: "06:00 AM",
        price: 2000,
        remainingSeats: 28
    },
    {
        name: "GreenLine",
        from: "MOMBASA",
        to: "KISUMU",
        time: "08:30 AM",
        price: 1950,
        remainingSeats: 17
    },
    {
        name: "EnaCoach",
        from: "MOMBASA",
        to: "KISUMU",
        time: "10:00 AM",
        price: 2100,
        remainingSeats: 20
    },
    {
        name: "Guardian Angel",
        from: "MOMBASA",
        to: "KISUMU",
        time: "12:00 PM",
        price: 2050,
        remainingSeats: 16
    },
    {
        name: "Transline",
        from: "MOMBASA",
        to: "KISUMU",
        time: "02:00 PM",
        price: 2000,
        remainingSeats: 19
    },
    {
        name: "EasyCoach",
        from: "KISUMU",
        to: "BUSIA",
        time: "07:00 AM",
        price: 800,
        remainingSeats: 30
    },
    {
        name: "GreenLine",
        from: "KISUMU",
        to: "BUSIA",
        time: "09:00 AM",
        price: 750,
        remainingSeats: 25
    },
    {
        name: "EnaCoach",
        from: "KISUMU",
        to: "BUSIA",
        time: "11:00 AM",
        price: 850,
        remainingSeats: 20
    },
    {
        name: "Guardian Angel",
        from: "KISUMU",
        to: "BUSIA",
        time: "01:00 PM",
        price: 800,
        remainingSeats: 22
    },
    {
        name: "Transline",
        from: "KISUMU",
        to: "BUSIA",
        time: "03:00 PM",
        price: 780,
        remainingSeats: 18
    },
    {
        name: "EasyCoach",
        from: "BUSIA",
        to: "SIRARE",
        time: "08:00 AM",
        price: 1200,
        remainingSeats: 24
    },
    {
        name: "GreenLine",
        from: "BUSIA",
        to: "SIRARE",
        time: "10:00 AM",
        price: 1150,
        remainingSeats: 22
    },
    {
        name: "EnaCoach",
        from: "BUSIA",
        to: "SIRARE",
        time: "12:00 PM",
        price: 1250,
        remainingSeats: 19
    },
    {
        name: "Guardian Angel",
        from: "BUSIA",
        to: "SIRARE",
        time: "02:00 PM",
        price: 1200,
        remainingSeats: 20
    },
    {
        name: "Transline",
        from: "BUSIA",
        to: "SIRARE",
        time: "04:00 PM",
        price: 1180,
        remainingSeats: 21
    },
    {
        name: "EasyCoach",
        from: "SIRARE",
        to: "MUMIAS",
        time: "07:00 AM",
        price: 1000,
        remainingSeats: 26
    },
    {
        name: "GreenLine",
        from: "SIRARE",
        to: "MUMIAS",
        time: "09:00 AM",
        price: 950,
        remainingSeats: 23
    },
    {
        name: "EnaCoach",
        from: "SIRARE",
        to: "MUMIAS",
        time: "11:00 AM",
        price: 1050,
        remainingSeats: 20
    },
    {
        name: "Guardian Angel",
        from: "SIRARE",
        to: "MUMIAS",
        time: "01:00 PM",
        price: 1000,
        remainingSeats: 18
    },
    {
        name: "Transline",
        from: "SIRARE",
        to: "MUMIAS",
        time: "03:00 PM",
        price: 980,
        remainingSeats: 25
    },
    {
        name: "EasyCoach",
        from: "MUMIAS",
        to: "MALABA",
        time: "06:00 AM",
        price: 700,
        remainingSeats: 28
    },
    {
        name: "GreenLine",
        from: "MUMIAS",
        to: "MALABA",
        time: "08:00 AM",
        price: 680,
        remainingSeats: 27
    },
    {
        name: "EnaCoach",
        from: "MUMIAS",
        to: "MALABA",
        time: "10:00 AM",
        price: 750,
        remainingSeats: 24
    },
    {
        name: "Guardian Angel",
        from: "MUMIAS",
        to: "MALABA",
        time: "12:00 PM",
        price: 720,
        remainingSeats: 22
    },
    {
        name: "Transline",
        from: "MUMIAS",
        to: "MALABA",
        time: "02:00 PM",
        price: 700,
        remainingSeats: 21
    }
];

const newData = async () => {
    try {
        await Bus.insertMany(busData);
        console.log('Added successfully');
    } catch (err) {
        throw err;
    }
};

module.exports = newData;

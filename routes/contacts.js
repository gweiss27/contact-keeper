const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");
// @route   GET api/contacts
// @desc    Get all users contacts
// @access  PRIVATE
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  PRIVATE
router.post(
    "/",
    [
        auth,
        [
            check("name", "Name is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  PRIVATE
router.put(
    "/:id",
    [
        auth,
        [
            check("name", "Name is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        try {
            // Find contact
            const contact = await Contact.findOne({ user: req.user.id });
            if (!contact) {
                res.send(404).json({ msg: "Contact Not Found" });
            }

            const { name, email, phone, type } = req.body;
            // await contact.updateOne();
            res.send(201).json({ msg: "Contact Updated" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   DELETE api/contacts/:id
// @desc    Update contact
// @access  PRIVATE
router.delete("/:id", auth, async (req, res) => {
    try {
        // Find contact
        const contact = await Contact.findOne({ user: req.user.id });
        if (!contact) {
            res.send(404).json({ msg: "Contact Not Found" });
        }

        await contact.remove();
        res.json({ msg: "Contact Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

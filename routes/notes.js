const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    const note = new Note({
        title,
        content,
        owner: req.user.id
    });

    await note.save();

    res.status(201).json({
        message: "Note created successfully",
        note
    });
});

router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ owner: req.user.id });

    res.status(200).json(notes);
});

router.get('/:id', auth, async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    if (note.owner.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    res.json(note);
});

router.put('/:id', auth, async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    if (note.owner.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    const { title, content } = req.body;

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    res.json(note);
});

router.delete('/:id', auth, async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    if (note.owner.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    await note.deleteOne();

    res.json({
        message: "Note deleted"
    });
});

module.exports = router;
"use strict";

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/survey/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        },
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching form:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/survey", async (req, res) => {
  try {
    const response = await fetch("https://api.typeform.com/forms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error creating survey:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/survey/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      const responseBody = await response.json();
      console.error("Error deleting survey:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.status(204).send();
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/survey/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error updating survey:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/survey/:id/responses", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}/responses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        },
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error retrieving responses:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

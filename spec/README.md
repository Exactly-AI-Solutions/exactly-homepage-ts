# Overview

Your task is to implement a website using the instructions below and the files in this (./spec) directory. This will be implemented using Typescript, React, etc. 

## Background

You are implementing a website that utilizes an LLM-like frontend interface (think ChatGPT/Claude/Gemini/etc) to interact with a backend agent API (implemented and served via a Mastra API).

The website has two pieces: the launchpad and takeover.

**Launchpad**: The website before the chat begins.
**Takeover**: The website once a chat has been initiated.

There is also a mobile version of the website.

## Functionality

On the launchpad, a user can use the input box to begin a chat with the chat agent (via Mastra API). The buttons below the input (suggestions) and the buttons in the header, when clicked, initiate the chat with canned responses.

The takeover is basically a chat session with the chatbot. You will use the Mastra Typescript SDK to interact and connect with the backend agent. 

## Reference Files

/Desktop - Contains the files necessary for implementing the desktop version of the site: .html files for the launchpad/takeover, sample images for visual reference, and a .pdf containing the spec for the site.

/Mobile - Contains reference .html files and .pdfs for the mobile spec.

/Assets - Contains animations and the logo .svg

## Deliverable

An implementation of the website that can be run locally and eventually deployed to a service such as Vercel.

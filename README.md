# Instant Messaging System: Alkhayat Renraku

## Specifications

Technologies used: HTML5, CSS3, JavaScript, Embedded JavaScript (EJS), MongoDB

Platform: Web-based

Genre: Instant Messaging, Forum or Discussion Platform

Latest version: 1.0.0-alpha (pre-release)

Released on Monday 2026-11-09

## Overview

Welcome!

This is the "Alkhayat Renraku", a fun and safe place for people to communicate with each other via an instant messaging forum.

The word "renraku" (連絡、れんらく) means "to contact, communicate or to get into touch with someone" in Japanese, which is not only the name of this service but also serves it as its prime purpose.

In this service, you can send messages within discussions sorted within channels and subchannels.

## Screenshots

## Getting Started

WARNING: This website is not optimal to run on a mobile phone. It is recommended to use a large-screen device such as a PC, tablet, game console, etc., with a browser resolution of at least 800x800px.

ATTENTION: Registration of a user is required to send, edit and delete messages. Unregistered users and guests are limited to viewing messages only.

To register, a user needs to be as of the minimum age of utilising SNS in your country. If your country does not impose a minimum age, then the base requirement of registration to Alkhayat Renraku is at least 13 years old by default. Please consult the laws, regulations and the government of your country before registering.

Furthermore, due to technical difficulties, updating content in this site is not possible as of now. Apologies for any inconvenience. As of now, you can only create, read and delete content.

## User Stories

1. When a user enters the site, he/she needs to make an account. A name, password, gender, date of birth, bio and other geolocational information must be included.

2. The user can either navigate via entering channels or see all discussions at once.

3. The messages are sorted through channels, subchannels and discussions. The user can create and edit subchannels, discussions and messages, but the administrator of the site can assign any channel to the system.

4. Discussions and messages can be reacted by sentiment by simply upvoting or downvoting them.

5. There is no reply function, so the only way to refer to someone's message is to use their message ID.

6. On the homepage, a user can be able to spark some ideas of their discussions using news features, like foreign exchange rates, weather conditions and many headlines using RSS feeds.

## Database Design

The database consists out of four categories where messages are stored:

1. Channel

2. Subchannel

3. Discussion

4. Message

## Routes

| Method | Route | Description |
|---------|-------|-------------|
| GET | / | Home page |
| GET | /channels | List all channels |
| GET | /channels/subchannels | List all subchannels |
| GET | /channels/subchannels/:subchannelID/ | List one subchannel showing all discussions |
| GET | /channels/subchannels/:subchannelID/discussion/:discussionID | List one discussion |
| POST | /channels/subchannels | Add a subchannel |
| POST | /channels/subchannels/:subchannelID/ | Add a discussion |
| POST | /channels/subchannels/:subchannelID/discussion/:discussionID | Add a message |
| GET | .../edit | Edit form |
| PUT | .../:id | Update form |
| DELETE | .../:id | Delete |

## Features

1. Sending, viewing, editing and deleting messages.

2. Messages are sorted through channels, subchannels and discussions.

3. Messages and discussions can be upvoted and downvoted to determine the overall sentiment of the audience.

4. The homepage contains news-related features such as foreign exchange, weather and RSS news feeds (limited to Japan, Star Trek and international news only).

## Future Enhancements

1. An incremental message ID must be implemented (not to be confused with the existing ID, as both will be used alongside each other) to determine the sequence of the message in a discussion.

2. A Japanese language release. (However, Japanese language users can use the platform to communicate in Japanese through channels, since the site uses Unicode (UTF-8) encoding which supports all languages.)

3. A view count for each discussion.

## No-AI Disclaimer

I, Fares Alkhayat, do not use artificial intelligence tools to generate, draft, edit, or automate my work — including designing and coding of this quiz.

What this means:

• Everything that I produce for clients and audiences is created by human professionals. All work sold or shared by me is 100% human-made.

• I do not use AI image generators, AI writing tools, or AI code assistants to create deliverables unless if one were to explicitly request and approve it in writing. Every piece is made by hand — my hand.

• When AI tools assist with administrative tasks (calendar management, scheduling, etc.), it is clearly disclosed.

Why do I have this policy:

I believe in the value of human skill, judgment, and craft. If so, I would be hired for perspective and expertise — not for a machine's approximation of it. I also believe that widespread AI use harms the livelihoods of working creatives and knowledge workers.

Therefore, I believe AI tools of all kinds are trained on the work of human workers without consent or compensation, and I won't participate in that system.

If you see my work used to train an AI without my permission, please let me know.

## Credits

© 2026 Fares Alkhayat. All rights reserved.

All copyrighted content belong to their respective owners.

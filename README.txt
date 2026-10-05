MCQ Master - mobile web app (PWA)

FILES
  index.html, script.js, style.css     the app
  sw.js, manifest.webmanifest,   make it installable + offline
  q-manifest.js, q-*.js                your questions
  check.html                           data checker (open it to validate the q-*.js files)

HOW TO USE
  1. Upload the whole folder to any HTTPS host (GitHub Pages, Netlify, Cloudflare Pages, Vercel).
     Installing and offline mode do not work from file://. For a local test run:
        python3 -m http.server 8000      then open http://localhost:8000
  2. Open the site on your phone:
        Android/Chrome: tap the "Install" card (or browser menu > Install app)
        iPhone/Safari : Share > Add to Home Screen

UPDATING QUESTIONS
  Edit/add q-*.js, update q-manifest.js, and change the "v" number in q-manifest.js.
  Phones then download the new data automatically and show a "new version" bar.

WHAT'S NEW
  - Search bar: focus glow, sweeping light line, pulsing icon while searching, typing placeholder, result cards slide in.
  - MCQ AI: 50 new prompts (say "commands" in the chat to see and tap them all):
      Quiz: repeat, 50 50, show answer, previous, restart, how many left, accuracy, streak, quiz mistakes,
            quiz skipped, slide these, practice these, harder, easier, swap question, time taken, reset score
      Sets: answers, answer 3, explain 3, set again, Next 10 without answers, then "1-B 2-A 3-C" to get marked
      Stats: my progress, best score, average score, last exam, how many wrong, weakest subject,
             strongest subject, list subjects, topics of math, daily status
      Pages: open search / history / bank / practice / daily / slider / read / add question / go home
      Extras: motivate me, study tip, what is the date, clear chat, surprise me, thanks, bye
      Most also work in Bangla, for example: আগের প্রশ্ন, আমার অগ্রগতি, সার্চ খোলো, শেষ পরীক্ষা, দুর্বল বিষয়.
  - MCQ AI chat: Ask question, Ask about math, Next 10, Random 10, Mix 10 (numbered MCQs + answer key), typing animation.
  - Question Slider: 15 s option added; phone Back now closes the More menu first.
  - Exam setup page redesigned (summary tiles, steppers, cut-mark selector).
  - More > MCQ AI: chat that reads the whole question bank (works offline).
    Optional: tap the gear and add a Google Gemini API key (free at aistudio.google.com/apikey) to answer anything.
  - More > Question Slider: timed slideshow (30/60/90/120 s), answer + explanation, swipe or arrow keys.
  - General Knowledge (English) category removed; Math added (Arithmetic, Algebra, Geometry, Mensuration).

NOTE
  q-manifest.js lists files (q-s5.js ... q-s15.js, q-sgd.js) that were not in the upload.
  Keep them next to the other q-*.js files or the app skips those lessons.

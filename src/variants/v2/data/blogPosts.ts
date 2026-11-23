import { assetUrl } from '../../../lib/assetUrl';

export type EssayBlock =
  | { type: 'paragraph'; html: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'break' };

export interface BlogPost {
  slug: string;
  title: string;
  dateLabel: string;
  readTime: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  excerpt: string;
  blocks: EssayBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'your-chance-to-be-an-olympian',
    title: 'Your Chance to be an Olympian',
    dateLabel: 'October 19, 2026',
    readTime: '5 min read',
    category: 'CONFRONTATION & VALUES',
    coverImage: assetUrl('media/red-seat-fenway.jpg'),
    coverAlt: 'Single red stadium seat standing out among rows of green seats',
    coverWidth: 1600,
    coverHeight: 1063,
    excerpt:
      'What if you could win an argument… without having to win the argument? On Below Deck, emotional reasoning, and earning Gold, Silver, or Bronze whenever you stand up for yourself.',
    blocks: [
      {
        type: 'paragraph',
        html: '<strong>What if you could win an argument… without having to win the argument?</strong>',
      },
      {
        type: 'paragraph',
        html: 'If you haven’t seen it, <em>Below Deck</em> is a reality TV show that follows the staff of a superyacht. Twenty- and thirty-somethings engage in hijinks and create drama amongst themselves, all while serving guests chartering 50-meter yachts in beautiful places like the Caribbean or the Mediterranean Sea. The staff is divided into two: the interior team, including stewards and the chef; and the deck team, comprised of a bosun and deckhands. The deck team keeps the boat clean, manages all the equipment for fun on the water, and handles the moorings at the dock. The stewards, or stews, function as cruise directors, bartenders, wait staff, and housekeeping. While the show focuses unapologetically on the crew’s partying off-hours, it also focuses closely on the work — which also stretches into the early mornings.',
      },
      {
        type: 'paragraph',
        html: 'In one episode, two stews struggle with tension as they negotiate a long night ahead. While the show is built around a backbone of peer-to-peer friction, this particular moment is less common because it involves a subordinate — Brooke, the second stew — managing up to Hannah, the chief stew. After several weeks of deteriorating tolerance, Brooke has had it with Hannah’s lack of follow-through and disorganized supervision style. In the pantry, away from the guests, Brooke specifies one item after another that Hannah just hasn’t done. The result? Predictable — by this point in the season, we’ve learned that Hannah, while experienced in her field, struggles with insecurities that she unsuccessfully hides behind a practiced confidence.',
      },
      {
        type: 'paragraph',
        html: 'The relatability of the moment is undeniable. How many times have you had a conversation like this? Or, more importantly, how often have you avoided a confrontation altogether because you just knew it wasn’t going to go well — especially one with your boss? Or, how often have you asked a friend how a difficult conversation went, only to hear this answer? “It went horribly. I don’t know why I bothered.”',
      },
      {
        type: 'paragraph',
        html: 'This is a pretty normal reaction. Our minds, especially the emotional bits, are so focused on the present moment, that our first thought — “This was a complete failure!” — takes up what appears to be permanent residence. Brooke herself tells a fellow crew member that the conversation went down “like a bag of nails.” A subsequent conversation the next day between Hannah, Brooke, and another stew goes equally well.',
      },
      {
        type: 'paragraph',
        html: 'Later in the storyline, however, we eventually see Hannah actually make many of the changes Brooke asked for — but without acknowledgement, let alone an apology. If you were in Brooke’s position, you might react with muted appreciation colored by skepticism about whether Hannah will sustain this pattern. I would empathize with you, and it’s easy to judge the experience as a mixed result. But I see it differently: as an outright win.',
      },
      {
        type: 'paragraph',
        html: 'Because our emotions are so strong, it’s so easy to conclude that the entirety of something like this went terribly. This is what therapist types like me call a “cognitive distortion,” and more specifically, this one is called <strong>emotional reasoning</strong>. Because we <em>feel</em> a certain way, then something <em>must be so.</em>',
      },
      {
        type: 'paragraph',
        html: 'If we look past the moments of frustration or even despair after what seems like a failed confrontation, we might miss what happens next. Here’s a way to look at it — and if you’ve ever dreamt of winning an Olympic medal, here’s your chance.',
      },
      {
        type: 'paragraph',
        html: 'You confront someone. There are three outcomes, or medals, for your effort:',
      },
      { type: 'heading', text: 'Gold' },
      {
        type: 'list',
        items: [
          'The other person <strong>acknowledges</strong> your points, and maybe even apologizes',
          'They also <strong>change their behavior</strong> to align with what you asked for',
        ],
      },
      { type: 'heading', text: 'Silver' },
      {
        type: 'list',
        items: [
          'The other person fails to acknowledge your points, or outright denies them',
          'But they do <strong>change their behavior</strong> to align with at least part of what you asked for, if not all of it',
        ],
      },
      { type: 'heading', text: 'Bronze' },
      {
        type: 'list',
        items: [
          'As in Silver, the other person denies or ignores your points',
          'They fail to change their behavior to align with what you’ve asked',
        ],
      },
      {
        type: 'paragraph',
        html: 'Brooke, for her efforts, would have earned a silver medal in this case — one I hope she would display proudly and prominently.',
      },
      {
        type: 'paragraph',
        html: 'You might be thinking, <strong>Why do I get a medal if the person reacts defensively <em>and</em> fails to change?</strong> I wouldn’t blame you for asking that. But in this framework, you still get a medal. Why?',
      },
      {
        type: 'paragraph',
        html: '<em>Do you know how hard it is to earn an Olympic medal? Of any color??</em>',
      },
      {
        type: 'paragraph',
        html: 'Spoiler: it’s really, really hard. Why we devalue “bronze” as “third-rate” is a whole other blog post. For now, remember this: committing to that scary conversation — with your boss, your peer, your kid, your spouse, your friend — is <em>really, really hard,</em> for so many reasons, and the more you know about <em>your</em> reasons, the better. That alone gets you on the podium. Standing up for yourself, in and of itself, is a behavior you can connect to a <strong>chosen value,</strong> which is your <strong>“why”</strong> in this case. “Why would I do this if I could leave the conversation empty-handed?”',
      },
      {
        type: 'paragraph',
        html: '<em>Because having the conversation anyway is a gift to yourself.</em> If that sounds corny, it’s because it is, but it’s also true. You will have proven to yourself that you’re capable of doing this hard thing, and that <strong>your opinion and voice matter.</strong> As long as <em>you</em> believe that, and as long as it is reinforced by the people you love and trust, it doesn’t matter what anyone else thinks.',
      },
      {
        type: 'paragraph',
        html: 'And finally, <em>that you said it at all</em> is still relevant. Once you ring a bell, it can’t be unrung. Even if the person never changes their behavior during the time that you know them, they’ll still remember that you said something (even if they deny it!). And it may make a difference in the next chapter of that person’s life, even if you won’t be there to see it.',
      },
      {
        type: 'paragraph',
        html: '<strong>Wait — it sounds like gold and silver depend on things outside of my control. Are you implying that Olympians who get gold and silver medals were just lucky, because there were things outside their control that fell into place?</strong>',
      },
      {
        type: 'paragraph',
        html: 'Not categorically, no. You’d have to ask each Olympian the story of their medal. Some might say, “Yeah, I got lucky when my rival slipped or missed a step.” Others might cite their unyielding grit and determination, and thank their coach, family, or religious faith. Still others might combine the two. For you, though, this doesn’t mean that you had nothing to do with a gold or silver result. Think about it:',
      },
      {
        type: 'paragraph',
        html: 'If the other person changes their behavior, and/or acknowledges your feedback, there has to be <em>something</em> that you contributed to the relationship that influenced that. That contribution probably came in the form of respect, or the benefit of the doubt (however small!), you extended toward the other person. We often feel this coming from someone else before we’re conscious of it, and it matters. So don’t come away from this post thinking that “gold” and “silver” results, in this schema, are just lucky. You <em>necessarily</em> contribute to them.',
      },
      {
        type: 'paragraph',
        html: 'This storyline was significant enough that my wife and I developed a shorthand: “Sounds like a Brooke/Hannah situation.” We use it to describe anything similar that pops up in our work or personal lives. Now that you know this shorthand too, keep an eye out for Brooke/Hannah situations in your life — and the medals you could earn.',
      },
    ],
  },
  {
    slug: 'promoted',
    title: 'Promoted *',
    dateLabel: 'September 10, 2026',
    readTime: '6 min read',
    category: 'PERFORMANCE & PERFECTIONISM',
    coverImage: assetUrl('media/piano-sheet-music.jpg'),
    coverAlt: 'Open classical piano score resting on an upright piano above keys',
    coverWidth: 1600,
    coverHeight: 1067,
    excerpt:
      'Eight years old on a church Steinway, going blank halfway through a Bach minuet—and discovering decades later why mistakes are the price of loving what you play.',
    blocks: [
      {
        type: 'paragraph',
        html: 'I’m eight years old. I pull on the gold handle of the heavy, white door of the sanctuary. I see rows of empty pews, except for one near the back. Two people, my piano teacher and the director of the music school that shared space with the church, sit quietly and greet me.',
      },
      {
        type: 'paragraph',
        html: 'I move toward the altar and sit at the shiny, black piano—the really good one, the Steinway we only played for recitals. The empty pews feel strange. I’m used to my adrenaline spiking in the presence of 100 people. My body is scared, but my brain’s jury is out—this isn’t a recital; it’s an exam to move up a level in the curriculum, and it’s my first one ever.',
      },
      {
        type: 'paragraph',
        html: 'My teacher invites me to start whenever I’m ready. I’ll play a handful of scales, a Cornelius Gurlitt etude, and then a Bach minuet. Seven minutes of music, at most.',
      },
      {
        type: 'paragraph',
        html: 'The scales are easy. The Gurlitt etude is little trouble. I’m three-quarters of the way through the Bach minuet when everything goes blank.',
      },
      { type: 'break' },
      {
        type: 'paragraph',
        html: 'I was six when I had my first piano lesson. For the first several months, my teacher was a hip, younger man who made me feel comfortable about learning the fundamentals. After it was clear enough I had some potential, I was assigned to a new teacher—a woman about my parents’ age. She was kind and respectful, but more serious, and she was really, really good at playing piano. For the next five or six years, she would set the agenda: Technique. Precision. Dynamics. The right notes. The right rhythm. The right phrasing. The right fingering. Practicing eventually became a chore, and my weekly lessons felt burdened with the shame of being unprepared.',
      },
      {
        type: 'paragraph',
        html: 'Some of the worst moments of my childhood were when my parents tried to get me to practice. They loved me then, as they do now, unconditionally and consistently. They also didn’t know, as most parents probably didn’t then (and many, perhaps, still don’t), how to induce their child to choose an activity (in this case, practicing) that requires facing one’s fears—possibly, their worst fears about failing or being good enough.',
      },
      {
        type: 'paragraph',
        html: 'So, they did their best. They reminded me to practice, overruled my objections with reasoning, appealed to the virtues of hard work, eventually gave me the room to take initiative myself, and when I didn’t, they spoke frankly about how piano lessons were becoming a waste of money. They even gave me an out: I didn’t have to do this anymore if I didn’t want to, and they wouldn’t have held it over my head.',
      },
      {
        type: 'paragraph',
        html: 'Paradoxically, that threw me into a feedback loop despite their reassurance—in my mind, I’d be a quitter. I’d be quitting something I could be good at, and that’s what hurt the most. Both my parents love music and raised me to do the same. Quitting piano would have been a betrayal.',
      },
      {
        type: 'paragraph',
        html: 'Eventually, the lessons came to an end in ninth grade when my dad told me quietly, and without scolding, that he’d canceled my lessons because I simply wasn’t practicing. But over those years I would practice just enough to perform, mostly mistake-free, at the winter and spring recitals. And every time, I felt like a rickety Conestoga wagon traversing a Rocky Mountain pass with its wheels about to fall off. Or, as was the case in my exam, about to tumble right over the edge.',
      },
      { type: 'break' },
      {
        type: 'paragraph',
        html: 'The exam requires me to play everything by heart. Panic building, I try to go back a few measures of the Bach minuet, but no dice. After my teacher gently suggests that I start the piece over, I get to the same spot and conk out again.',
      },
      {
        type: 'paragraph',
        html: 'The fear peaks when she comes up the aisle with the sheet music. I’d always been so impatient to memorize the music, to get it into my hands, into my muscle memory, that my sightreading skills were weak. It was as if she was throwing me a life vest that I couldn’t inflate. Mercifully, she and the director end the exam and ask me to wait outside. What was likely a few minutes’ wait feels like a solid half-hour with my self-worth on the line.',
      },
      {
        type: 'paragraph',
        html: 'Finally, my teacher opens the door. “Despite the mishap,” she says, they decided to promote me to the next level. I remember feeling grateful, but also like it was a hollow victory. Or a baseball statistic with an asterisk. And in the days and weeks that follow, there really isn’t much debrief. There isn’t much after recitals, either. We just move on.',
      },
      { type: 'break' },
      {
        type: 'paragraph',
        html: 'Today, that asterisk denotes not a personal failure of mine, but a sequence of missed opportunities to get to the heart of why I was taking piano lessons at all. While the importance of technique in music performance is undeniable, that was the only focus I remember. I don’t remember anyone asking me questions about the experience:',
      },
      {
        type: 'list',
        items: [
          'What do you feel when you play this?',
          'What is this music about for you? Do you notice any images or pictures in your mind?',
          'Do you like this song? This genre of music?',
          'What do you feel, or think, when you play a wrong note? What do you think that’s about?',
        ],
      },
      {
        type: 'paragraph',
        html: 'Questions like these (and there are, of course, many more) allow a teacher to help a student truly connect themselves to the music, which makes it easier to keep an important question in sight: <em>Why do we play music at all?</em> This is a question that a teacher can help students answer themselves. And if they own that answer, they can own their performance—and then develop other critical things like autonomy, self-esteem, and, perhaps most importantly, self-empathy.',
      },
      {
        type: 'paragraph',
        html: 'Mistakes are not only okay; they’re crucial. Necessary. Not optional. A student must be encouraged to integrate their mistakes into every aspect of their playing, whether that’s rehearsal or performance. By <em>integrate,</em> I mean to make it <em>a part of</em> one’s playing—rather than the enemy. Embracing one’s mistakes means not to repeat them or excuse them, but to <em>use</em> them. Even make friends with them. They’re helpful, not hurtful.',
      },
      {
        type: 'paragraph',
        html: 'I don’t blame my teacher or my parents for the missed opportunities to ask questions like the ones above. It was the Eighties—I don’t think those were questions they would have naturally reached for.',
      },
      {
        type: 'paragraph',
        html: 'So as I pick up a new instrument (trumpet!) in my late forties, and rekindle my relationship with the piano from time to time, I’m fighting a narrative—but not one put there by my parents, nor by my teacher. It was one I’d synthesized based on my experiences: <em>Mistakes are unacceptable and reflect failure—as a piano player, and maybe even as a person.</em> And it’s neither a useful nor sustainable narrative.',
      },
      {
        type: 'paragraph',
        html: 'I’m not unique in this way. For most of us, this is our automatic, default position; our first thought. Playing music enough to enjoy it means that I have to get to my second thought: I give myself permission to make mistakes, to sound bad, to make cringey noises. And I give myself that permission because it’s the only way I’ll get better—but more importantly, the only way I’ll have fun. And that’s why I play music at all… <em>because it’s fun. It feels good.</em>',
      },
      {
        type: 'paragraph',
        html: 'Speaking of the Eighties, not too long ago I stumbled on an <a href="https://youtu.be/7A8NgPVizP4?si=lYJVZwxrOhblUwnL" target="_blank" rel="noopener noreferrer">old video of a young Phil Collins</a>. He was performing “Against All Odds” in front of a giant crowd at Wembley Stadium for Live Aid, just him and the piano. About a minute in, he hits an obvious wrong note, grimaces, smiles, and continues. In the moment that I saw it, over 30 years later, I was instantly redeemed. <em>Even Phil Collins messes up! It’s okay!</em> I wrapped my arms around my inner child and gave him a huge hug.',
      },
    ],
  },
  {
    slug: 'having-a-hard-time-getting-motivated',
    title: "SO YOU'RE AT HOME AND HAVING A REALLY HARD TIME GETTING MOTIVATED",
    dateLabel: 'May 16, 2020',
    readTime: '4 min read',
    category: 'ACT & VALUES IN PRACTICE',
    coverImage: assetUrl('media/vinyl-turntable.jpg'),
    coverAlt: 'Vinyl record spinning under a warm amber filament lamp',
    coverWidth: 1067,
    coverHeight: 1600,
    excerpt:
      'Type 1 vs. Type 2 rewards, taking your breaks “hostage,” and flipping your thinking from escaping discomfort to moving toward what you genuinely value.',
    blocks: [
      {
        type: 'paragraph',
        html: 'This pandemic sucks. Finding motivation may have already sucked anyway, but now it <em>really</em> sucks.',
      },
      {
        type: 'paragraph',
        html: 'Below, you can find some specific tips that might help.',
      },
      { type: 'heading', text: 'This page in a nutshell:' },
      {
        type: 'list',
        items: [
          'Distractions come in two forms: ones that have an end ("type 1") and ones that don\'t ("type 2").',
          'Knowing whether to allow yourself a type 1 or type 2 distraction can help you serve your work needs <em>and</em> your play needs. (Yes, you have play "needs" too.)',
          'A countdown timer that makes noise can help you establish focus.',
        ],
      },
      { type: 'heading', text: 'This page in depth:' },
      {
        type: 'paragraph',
        html: "Let's be honest: you know when you're doing work, and when you're not. If you're not, you're giving yourself a reward. Sometimes you feel like you've earned the reward; sometimes you don't. If you want to increase the frequency of earning it, and thereby your productivity, try this:",
      },
      {
        type: 'paragraph',
        html: 'There are <strong>two</strong> categories of rewards.',
      },
      {
        type: 'paragraph',
        html: "<strong>Type 1</strong> rewards are any behavior that you <em>want</em> to do that DOES have a definitive, specific end. Once it's over, that's it—there's no more. Examples might include:",
      },
      {
        type: 'list',
        items: [
          'going to the bathroom',
          'going for a walk (you have to come home at some point)',
          'eating a snack or a meal',
          'watching a sunset',
          'catching up with a friend, with a <em>clearly expressed time limit</em>',
        ],
      },
      {
        type: 'paragraph',
        html: "<strong>Type 2</strong> rewards, on the other hand, are any behavior that you <em>want</em> to do that does NOT have a specific end to it. In other words, it's an activity that you choose without much (if any) regard for how long it'll really take. Or, if you decide you're only going to do it for like, an hour, it can end up lasting two or three times that long—or more. Typically, these are amusing activities, but they can also be chores. Examples are usually easier to come up with than type 1 rewards. They might include:",
      },
      {
        type: 'list',
        items: [
          'video games',
          'watching or streaming TV, like Netflix or YouTube',
          'looking things up on Wikipedia',
          'using Facebook, Twitter, Instagram, Reddit, or Discord',
          'cleaning your kitchen… and then your bathroom, and your bedroom, and...',
          'reading',
          'crafting (e.g., painting, crocheting or knitting, sewing)',
          'catching up with a friend, <em>without</em> an expressed time limit',
        ],
      },
      {
        type: 'paragraph',
        html: "(You might argue that a YouTube video, for example, might fall into the type 1 category because it has a finite end point. And you wouldn't be wrong—if we were talking about just that one video on its own. But, as you probably know, the YouTube experience <em>doesn't</em> really have an end because the site is constantly showing you more things to watch.)",
      },
      {
        type: 'paragraph',
        html: 'Obviously, some activities can straddle the line. A type 2 activity for one person may be a type 1 for another. Generally speaking, however, type 2 rewards are <strong>more immersive</strong> and type 1 rewards are <strong>less immersive.</strong> You have to make the best decision for you about what that means—and it may mean some trial and error.',
      },
      {
        type: 'paragraph',
        html: 'So, now that we have these two types of non-work time, what do we do with them?',
      },
      { type: 'heading', text: 'Sequestering Break or Play Time' },
      {
        type: 'paragraph',
        html: 'We take them as "hostages!" You might be feeling like a hostage yourself right now, so it\'s time to take some of your own. And this story has a happy ending―all of the hostages must be, and will be, released.',
      },
      {
        type: 'paragraph',
        html: '(If you don\'t like the word "hostage," that\'s okay. Pick the word that works best for you―"collateral," for example, might be a good alternative.)',
      },
      {
        type: 'paragraph',
        html: "If you're faced with a boring, uncomfortable, unattractive task, take a hostage. Make a deal with yourself that when you complete the boring task―<em>or any portion of it</em>―you'll release the hostage.",
      },
      {
        type: 'paragraph',
        html: "But which type is best? If you're trying to get started, or to maintain some momentum, type 1 (short breaks) are best.",
      },
      {
        type: 'paragraph',
        html: "For example, let's say that you need to read a chapter of a textbook. And this chapter is pretty dense, so the thought of having to read it makes your stomach turn. Maybe you're faced with thoughts like, <em>I can't do this.</em> Or, <em>I have to do this whole thing.</em>",
      },
      {
        type: 'paragraph',
        html: 'So you say to yourself, "I\'ll just jump on Facebook or YouTube, but only for a few minutes." But it won\'t be a few minutes. And you know it. This is probably the most critical moment in this process.',
      },
      {
        type: 'paragraph',
        html: "Before you reach for that phone, quick!―make a deal with yourself. If you read a portion of the chapter, <em>even if it's just one page―or even a paragraph!―</em>you'll let yourself go to the bathroom (a type 1 reward). Don't let yourself go until you've read the page. You can do it. Anything is better than nothing.",
      },
      {
        type: 'paragraph',
        html: "When you hold up your end of the deal and read that one page, count it as a win and give yourself the reward. Then, next time, see how far you can stretch yourself. One more paragraph, or one more page? What about two?",
      },
      {
        type: 'paragraph',
        html: 'Type 2 rewards, or more immersive activities, work best when:',
      },
      {
        type: 'list',
        items: [
          "you've finished a task and have a gap between now and a scheduled activity that almost always involves someone else (e.g., a meeting or an appointment)",
          "you're done with work for the day",
        ],
      },
      { type: 'heading', text: 'Flip Your Thinking On Its Head' },
      {
        type: 'paragraph',
        html: 'Type 2 rewards can be your proverbial light at the end of the tunnel. In using this system, you might be able to shift your mental association: type 2 rewards might feel less like instant gratification. Instead, they might feel more valuable and sustainable.',
      },
      {
        type: 'paragraph',
        html: 'In that way, the reward’s purpose can fundamentally change. <strong>Instead of using it as a way to avoid doing work</strong> (i.e., escaping suffering)<strong>, you can use work as a way to move toward the reward</strong> (i.e., pursuing something you value).*',
      },
      { type: 'heading', text: 'Budgeting Time… For Fun!' },
      {
        type: 'paragraph',
        html: "Seeing these two types of rewards in this way can help you plan for both work and play time. Do you want one glorious day this week when all you do is play video games? You can have it! You'll probably need to hustle the other days of the week, but if you designate time on your schedule for play―just like you would for work time―you've got a better chance of enjoying yourself with much less guilt (if any at all).",
      },
      { type: 'heading', text: 'An Important Piece: The Timer' },
      {
        type: 'paragraph',
        html: "So you've taken a hostage or two, but you're still having trouble getting started. Set a countdown timer. Any timer that will make noise works. Set it for as <strong>short of a time as possible</strong>, and take it as a challenge. Can you write a couple paragraphs for that paper in 5 minutes? What about that page in the textbook―could you polish it off in two minutes? That challenge could be the zap that you need to get moving.",
      },
      { type: 'heading', text: 'Get To It' },
      {
        type: 'paragraph',
        html: 'Remember: anything is better than nothing. I’d wish you luck, but it’s not about luck. You can do this!',
      },
      { type: 'heading', text: 'FOOTNOTE' },
      {
        type: 'paragraph',
        html: '*The idea of moving toward a value instead of merely escaping suffering comes from <a href="https://en.wikipedia.org/wiki/Acceptance_and_commitment_therapy" target="_blank" rel="noopener noreferrer">Acceptance and Commitment Therapy</a>, which was developed by <a href="https://www.unr.edu/psychology/faculty/steven-hayes" target="_blank" rel="noopener noreferrer">Dr. Steven Hayes</a>. If you’ve worked with me before, the language may sound familiar!',
      },
    ],
  },
];

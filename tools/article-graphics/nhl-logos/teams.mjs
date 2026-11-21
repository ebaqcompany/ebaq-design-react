// The 21 NHL teams added to /blog/best-nhl-logos in Nov 2026 (ranks 12–32).
// Logos are the official SVGs from assets.nhle.com/logos/nhl/svg/<ABBR>_light.svg.
// `labels` are the four hand-written annotations on each "logo explained" plate:
// [top, left, right, bottom]. Keep each to 1–3 short words.
export const teams = [
  {
    abbr: "DET", name: "Detroit Red Wings", file: "detroit-red-wings",
    labels: ["winged wheel", "Motor City", "speed lines", "one color"],
    intro: [
      "The Detroit Red Wings date back to <strong>1926</strong> and took their current name in <strong>1932</strong>, when owner James Norris brought over the <strong>winged wheel</strong> from his old Montreal club.",
      "It's an <strong>Original Six</strong> team with <strong>11 Stanley Cups</strong>, and the logo has barely changed in over 90 years.",
    ],
    breakdown: [
      "A spoked <strong>car wheel</strong> with a single <strong>wing</strong> sweeping back from it.",
      "The wheel is a direct nod to Detroit as the <strong>Motor City</strong>.",
      "Drawn in one flat <strong>red</strong> on white, with no gradients or outlines.",
    ],
    opinion: [
      "One of the best examples of a logo that <strong>tells you where the team is from</strong>.",
      "The wing gives a static wheel a real sense of <strong>speed</strong>.",
      "It works in one color, at any size, which is why it has <strong>never needed a redesign</strong>.",
    ],
  },
  {
    abbr: "MTL", name: "Montreal Canadiens", file: "montreal-canadiens",
    labels: ["C + H monogram", "bold red", "blue ring", "since 1917"],
    intro: [
      "Founded in <strong>1909</strong>, the Montreal Canadiens are the oldest team in professional hockey and the most successful, with <strong>24 Stanley Cups</strong>.",
      "Their famous <strong>“CH”</strong> stands for <strong>Club de Hockey Canadien</strong>. The popular story that the H means “Habitants” is a myth, even though the nickname “Habs” stuck.",
    ],
    breakdown: [
      "A red <strong>“C”</strong> wrapped around a white <strong>“H”</strong>, forming one compact monogram.",
      "A thin <strong>blue outline</strong> completes the red, white, and blue palette.",
      "Heavy, rounded letterforms that read clearly from the top row of the arena.",
    ],
    opinion: [
      "A <strong>perfect monogram</strong>: two letters, one shape, zero clutter.",
      "It feels <strong>historic without looking dated</strong>.",
      "Like the Yankees “NY”, it has become bigger than the sport itself.",
    ],
  },
  {
    abbr: "BOS", name: "Boston Bruins", file: "boston-bruins",
    labels: ["spoked B", "the Hub", "black + gold", "bold circle"],
    intro: [
      "The Boston Bruins joined the NHL in <strong>1924</strong> as the league's <strong>first American team</strong> and celebrated their <strong>100th season</strong> in 2023–24.",
      "The <strong>spoked “B”</strong> has been their main mark since 1948, and its spokes are often read as a nod to Boston's nickname, <strong>“The Hub”</strong>.",
    ],
    breakdown: [
      "A bold black <strong>“B”</strong> set inside a wheel with <strong>six spokes</strong>.",
      "A strict two-color palette of <strong>black and gold</strong>.",
      "A thick outer ring that turns the letter into a <strong>badge</strong>.",
    ],
    opinion: [
      "Simple, tough, and <strong>instantly recognizable</strong> on a jersey or a hat.",
      "The black and gold combination is one of the <strong>strongest in sports</strong>.",
      "Proof that a single letter can carry a <strong>century of history</strong>.",
    ],
  },
  {
    abbr: "STL", name: "St. Louis Blues", file: "st-louis-blues",
    labels: ["music note", "wing", "two blues", "no letters"],
    intro: [
      "The St. Louis Blues joined the NHL in the <strong>1967 expansion</strong> and won their first <strong>Stanley Cup in 2019</strong>.",
      "The team is named after W.C. Handy's song <strong>“St. Louis Blues”</strong>, so the logo is a <strong>blue note</strong> with a wing.",
    ],
    breakdown: [
      "A <strong>musical note</strong> whose flag turns into a <strong>wing</strong>.",
      "Two shades of <strong>blue</strong> with a touch of yellow.",
      "No letters at all: the name is <strong>told through a symbol</strong>.",
    ],
    opinion: [
      "One of the cleverest names-to-symbol translations in sports.",
      "The <strong>clean silhouette</strong> holds up at tiny sizes.",
      "It ties the team to the city's <strong>music culture</strong> without being literal.",
    ],
  },
  {
    abbr: "MIN", name: "Minnesota Wild", file: "minnesota-wild",
    labels: ["landscape inside", "North Star", "wild animal", "red eye"],
    intro: [
      "The Minnesota Wild entered the NHL in <strong>2000</strong>, bringing the league back to the <strong>State of Hockey</strong> after the North Stars left for Dallas.",
      "Their logo is famous for showing <strong>two pictures at once</strong>.",
    ],
    breakdown: [
      "The outline of a <strong>wild animal's head</strong>, facing left.",
      "Inside it, a <strong>Minnesota landscape</strong>: pine trees, a river, a sunset sky, and a shooting star.",
      "The star nods to Minnesota's motto, <strong>“L'Étoile du Nord”</strong>, and the departed North Stars.",
    ],
    opinion: [
      "A smart use of <strong>figure and ground</strong>: you see the animal, then the scenery.",
      "It packs a lot of detail, so it's weaker at <strong>small sizes</strong>.",
      "Still one of the most <strong>original concepts</strong> in the league.",
    ],
  },
  {
    abbr: "VAN", name: "Vancouver Canucks", file: "vancouver-canucks",
    labels: ["orca = C", "West Coast art", "breaking ice", "blue + green"],
    intro: [
      "The Vancouver Canucks joined the NHL in <strong>1970</strong>, and their logo history includes some of the league's wildest designs.",
      "Since 2007, the primary logo has been the <strong>orca</strong>, first introduced in 1997.",
    ],
    breakdown: [
      "An <strong>orca whale</strong> bursting out of the ice, its body curving into a <strong>“C”</strong>.",
      "Styling inspired by the <strong>Indigenous art</strong> of the Pacific Northwest.",
      "Navy, <strong>blue, and green</strong> that reflect the coast.",
    ],
    opinion: [
      "The letter and the animal are <strong>one idea</strong>, which is hard to pull off.",
      "It feels rooted in <strong>place</strong>, not just in sport.",
      "Calmer than the famous 1978 “flying V”, and much better for it.",
    ],
  },
  {
    abbr: "WPG", name: "Winnipeg Jets", file: "winnipeg-jets",
    labels: ["RCAF roundel", "fighter jet", "maple leaf", "aviation blue"],
    intro: [
      "The current Winnipeg Jets arrived in <strong>2011</strong>, when the Atlanta Thrashers relocated to Manitoba.",
      "The logo pays tribute to the <strong>Royal Canadian Air Force</strong>, which has deep roots in Winnipeg.",
    ],
    breakdown: [
      "A circular <strong>roundel</strong> borrowed from military aircraft markings.",
      "A silver <strong>fighter jet</strong> pointing straight up over a red <strong>maple leaf</strong>.",
      "Navy, <strong>aviation blue</strong>, silver, and red.",
    ],
    opinion: [
      "Disciplined and <strong>symmetrical</strong>, it feels like an official insignia.",
      "The military reference gives the name <strong>real meaning</strong>.",
      "Maybe a little too serious for some fans, but it's <strong>very well crafted</strong>.",
    ],
  },
  {
    abbr: "UTA", name: "Utah Mammoth", file: "utah-mammoth",
    labels: ["tusk = U", "Wasatch peaks", "state outline", "Rock Black"],
    intro: [
      "Utah's NHL team started play in <strong>2024</strong> after the Arizona Coyotes' hockey operations moved to Salt Lake City.",
      "After one season as the <strong>Utah Hockey Club</strong>, the team became the <strong>Utah Mammoth</strong> in May 2025, with a new “Mountain Mammoth” logo.",
    ],
    breakdown: [
      "A charging <strong>mammoth head</strong> with its tusk curving up into a <strong>“U”</strong>.",
      "Snow-capped <strong>Wasatch Mountains</strong> form the top of its head, and the ear hides the <strong>outline of Utah</strong>.",
      "Colors named <strong>Rock Black, Mountain Blue, and Salt White</strong>.",
    ],
    opinion: [
      "The newest logo in the league and already one of the <strong>most talked-about</strong>.",
      "Lots of hidden details, but the <strong>silhouette stays bold</strong>.",
      "A good lesson in how much <strong>local storytelling</strong> you can fit into one mark.",
    ],
  },
  {
    abbr: "EDM", name: "Edmonton Oilers", file: "edmonton-oilers",
    labels: ["oil drop", "blue + orange", "bold wordmark", "simple circle"],
    intro: [
      "The Edmonton Oilers started in the WHA in <strong>1972</strong> and joined the NHL in <strong>1979</strong>.",
      "Led by Wayne Gretzky, they won <strong>five Stanley Cups</strong> between 1984 and 1990.",
    ],
    breakdown: [
      "A blue circle with the word <strong>“OILERS”</strong> set in heavy capitals.",
      "An orange <strong>oil drop</strong> sits above the name, a nod to Alberta's oil industry.",
      "A classic <strong>blue and orange</strong> palette.",
    ],
    opinion: [
      "Not flashy, but <strong>clear and honest</strong> about where the team comes from.",
      "The drop is a tiny detail that does <strong>a lot of work</strong>.",
      "Feels like a <strong>retro sports badge</strong> in the best way.",
    ],
  },
  {
    abbr: "NJD", name: "New Jersey Devils", file: "new-jersey-devils",
    labels: ["NJ monogram", "horns", "devil tail", "red + black"],
    intro: [
      "The franchise began as the Kansas City Scouts in <strong>1974</strong>, moved to Colorado, and settled in New Jersey in <strong>1982</strong>.",
      "The name comes from the <strong>Jersey Devil</strong>, a creature from New Jersey folklore.",
    ],
    breakdown: [
      "An <strong>“N” and “J”</strong> joined into one monogram.",
      "The J grows <strong>horns</strong> at the top and a pointed <strong>tail</strong> at the bottom.",
      "Red and black, set inside a white circle.",
    ],
    opinion: [
      "A fun, <strong>clever monogram</strong> that adds personality without a mascot drawing.",
      "The letters are a little hard to read at first glance.",
      "Still, it's <strong>unmistakably</strong> the Devils.",
    ],
  },
  {
    abbr: "CAR", name: "Carolina Hurricanes", file: "carolina-hurricanes",
    labels: ["storm swirl", "puck = eye", "warning flags", "motion"],
    intro: [
      "The Carolina Hurricanes moved to Raleigh in <strong>1997</strong>. Before that, they were the <strong>Hartford Whalers</strong> (see the bonus pick below).",
      "They won the <strong>Stanley Cup in 2006</strong>.",
    ],
    breakdown: [
      "A red and black <strong>hurricane swirl</strong>, like a storm seen on a weather map.",
      "A black <strong>puck</strong> sits in the eye of the storm.",
      "Colors inspired by the red and black <strong>hurricane warning flags</strong>.",
    ],
    opinion: [
      "Strong sense of <strong>motion</strong> for a static logo.",
      "The puck in the eye is a <strong>smart, simple</strong> detail.",
      "It looks a bit <strong>90s</strong>, but it still works.",
    ],
  },
  {
    abbr: "ANA", name: "Anaheim Ducks", file: "anaheim-ducks",
    labels: ["goalie mask", "crossed sticks", "orange county", "angry eyes"],
    intro: [
      "The team was founded in <strong>1993</strong> by Disney as the <strong>Mighty Ducks of Anaheim</strong>, named after the hit movie.",
      "In 2024, the Ducks went <strong>orange</strong> and brought back an updated version of the original <strong>duck-mask logo</strong>.",
    ],
    breakdown: [
      "A duck's head wearing a <strong>goalie mask</strong>, framed by <strong>crossed sticks</strong>.",
      "A triangle shape behind it, from the original Mighty Ducks logo.",
      "New <strong>orange, black, and gold</strong> colors, a nod to Orange County.",
    ],
    opinion: [
      "A great example of <strong>nostalgia done right</strong>.",
      "Much more <strong>characterful</strong> than the webbed-foot “D” it replaced.",
      "The orange makes the team <strong>stand out</strong> in a league full of navy.",
    ],
  },
  {
    abbr: "WSH", name: "Washington Capitals", file: "washington-capitals",
    labels: ["three stars", "stick = t", "script wordmark", "red, white, blue"],
    intro: [
      "The Washington Capitals joined the NHL in <strong>1974</strong> and won their first <strong>Stanley Cup in 2018</strong>.",
      "In 2007, the team returned to a modern version of its original <strong>wordmark logo</strong>.",
    ],
    breakdown: [
      "The word <strong>“capitals”</strong> in lowercase italic letters.",
      "The <strong>“t”</strong> is drawn as a <strong>hockey stick</strong>.",
      "<strong>Three stars</strong> above, inspired by the District of Columbia flag.",
    ],
    opinion: [
      "A wordmark is a <strong>bold choice</strong> in a league full of crests.",
      "The stick and stars feel <strong>patriotic</strong> without being heavy-handed.",
      "It reads a little small on a jersey compared to a big symbol.",
    ],
  },
  {
    abbr: "CGY", name: "Calgary Flames", file: "calgary-flames",
    labels: ["flaming C", "heat", "red + gold", "from Atlanta"],
    intro: [
      "The Flames started in <strong>Atlanta in 1972</strong> and moved to Calgary in <strong>1980</strong>.",
      "They kept the name, and the flame idea carried over into the logo.",
    ],
    breakdown: [
      "A bold red <strong>“C”</strong> with flames trailing off the back.",
      "Yellow and gold flames, outlined in black.",
      "Italic angle that suggests <strong>forward motion</strong>.",
    ],
    opinion: [
      "Direct and <strong>easy to read</strong>, even from far away.",
      "Very <strong>literal</strong>, but sports fans like literal.",
      "A good letter-based logo that <strong>owns its color</strong>.",
    ],
  },
  {
    abbr: "OTT", name: "Ottawa Senators", file: "ottawa-senators",
    labels: ["Roman senator", "gold helmet", "flat 2D", "cape"],
    intro: [
      "The modern Ottawa Senators joined the NHL in <strong>1992</strong>, reviving the name of an early Ottawa club that won many Stanley Cups.",
      "In <strong>2020</strong>, they returned to a flat <strong>“2D” version</strong> of their original centurion logo.",
    ],
    breakdown: [
      "The profile of a <strong>Roman senator</strong> wearing a gold <strong>helmet</strong> with a red crest.",
      "A flowing cape set inside a black circle.",
      "Red, black, and <strong>gold</strong>.",
    ],
    opinion: [
      "A stronger, <strong>flatter</strong> look than the 3D version they dropped.",
      "The Roman theme connects to the name, though not to the city.",
      "Detailed, but <strong>well balanced</strong>.",
    ],
  },
  {
    abbr: "SJS", name: "San Jose Sharks", file: "san-jose-sharks",
    labels: ["bites the stick", "teal", "triangle", "aggressive"],
    intro: [
      "The San Jose Sharks joined the NHL in <strong>1991</strong>, bringing the league back to the Bay Area.",
      "Their <strong>teal</strong> was a bold choice at the time and quickly made their merchandise a hit.",
    ],
    breakdown: [
      "A <strong>shark</strong> bursting through a triangle, <strong>biting a hockey stick</strong>.",
      "Teal, black, white, and a touch of orange.",
      "Sharp angles that suggest <strong>speed and aggression</strong>.",
    ],
    opinion: [
      "Very <strong>90s</strong>, in a fun way.",
      "The stick in the mouth says “hockey” without any lettering.",
      "Busier than it needs to be, but <strong>memorable</strong>.",
    ],
  },
  {
    abbr: "COL", name: "Colorado Avalanche", file: "colorado-avalanche",
    labels: ["A = mountain", "snow swoosh", "puck", "burgundy + blue"],
    intro: [
      "The Colorado Avalanche moved from Quebec, where they were the <strong>Nordiques</strong>, in <strong>1995</strong>.",
      "They won the Stanley Cup in their very first season in Denver, and again in <strong>2001 and 2022</strong>.",
    ],
    breakdown: [
      "A burgundy <strong>“A”</strong> shaped like a <strong>mountain peak</strong>.",
      "A blue and white <strong>swoosh of snow</strong> wraps around it.",
      "A <strong>puck</strong> sits at the bottom of the swoosh.",
    ],
    opinion: [
      "A nice link between the name and the <strong>Rocky Mountains</strong>.",
      "The swoosh adds energy but also <strong>visual noise</strong>.",
      "Feels dated next to newer, flatter logos.",
    ],
  },
  {
    abbr: "BUF", name: "Buffalo Sabres", file: "buffalo-sabres",
    labels: ["charging buffalo", "crossed sabres", "royal blue", "classic circle"],
    intro: [
      "The Buffalo Sabres joined the NHL in <strong>1970</strong>.",
      "After trying several designs, they returned to their classic <strong>royal blue and gold</strong> logo in <strong>2020</strong>.",
    ],
    breakdown: [
      "A <strong>buffalo</strong> leaping over two <strong>crossed sabres</strong>.",
      "Set inside a blue circle with a gold outline.",
      "A simple, <strong>badge-like</strong> layout.",
    ],
    opinion: [
      "Going back to the original was <strong>the right call</strong>.",
      "Clear symbols, but the buffalo is a bit <strong>small and thin</strong>.",
      "A charming <strong>vintage</strong> logo.",
    ],
  },
  {
    abbr: "LAK", name: "Los Angeles Kings", file: "los-angeles-kings",
    labels: ["chevron shield", "crown", "silver + black", "italic wordmark"],
    intro: [
      "The Los Angeles Kings joined the NHL in the <strong>1967 expansion</strong> and won Stanley Cups in <strong>2012 and 2014</strong>.",
      "In <strong>2024</strong>, they introduced a new primary logo built around a <strong>chevron-shaped shield</strong>.",
    ],
    breakdown: [
      "The word <strong>“KINGS”</strong> in bold italic letters inside a <strong>shield</strong>.",
      "A small <strong>crown</strong> at the bottom and “Los Angeles” at the top.",
      "Silver, <strong>black</strong>, and white.",
    ],
    opinion: [
      "The silver and black still carry the <strong>Gretzky-era</strong> energy.",
      "The shield shape feels a bit <strong>generic</strong>.",
      "Clean and professional, but not very <strong>distinctive</strong>.",
    ],
  },
  {
    abbr: "NYI", name: "New York Islanders", file: "new-york-islanders",
    labels: ["Long Island map", "stick = Y", "orange + blue", "NY"],
    intro: [
      "The New York Islanders joined the NHL in <strong>1972</strong> and won <strong>four straight Stanley Cups</strong> from 1980 to 1983.",
      "Their logo has stayed close to the original for more than 50 years.",
    ],
    breakdown: [
      "A blue circle with a bold orange <strong>“NY”</strong>.",
      "A map of <strong>Long Island</strong> runs across the middle.",
      "A <strong>hockey stick</strong> forms the leg of the Y, with “ISLANDERS” below.",
    ],
    opinion: [
      "The map is a nice, <strong>local detail</strong>.",
      "Lots of elements fighting for attention.",
      "<strong>Loved by fans</strong> for its history more than its design.",
    ],
  },
  {
    abbr: "CBJ", name: "Columbus Blue Jackets", file: "columbus-blue-jackets",
    labels: ["Ohio flag", "star", "ribbon C", "Civil War"],
    intro: [
      "The Columbus Blue Jackets joined the NHL in <strong>2000</strong>.",
      "The name honors Ohio's role in the <strong>Civil War</strong>, when many Ohio soldiers wore blue Union jackets.",
    ],
    breakdown: [
      "A red, white, and blue <strong>ribbon</strong> forming a <strong>“C”</strong>, inspired by the <strong>Ohio state flag</strong>.",
      "A silver <strong>star</strong> in the center.",
      "Navy blue background.",
    ],
    opinion: [
      "The story behind it is <strong>strong</strong>.",
      "The mark itself looks <strong>generic</strong>, like many other patriotic logos.",
      "Hard to remember compared to the rest of the league.",
    ],
  },
];

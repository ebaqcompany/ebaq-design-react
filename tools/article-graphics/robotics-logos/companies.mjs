// 36 robotics companies for /blog/robotics-logos, in four boards of nine (v2, Nov 21 2026: typical robotics brands only).
export const boards = [
  { name: "Humanoid robot companies", companies: [
    ["Figure", "https://www.figure.ai/"], ["Boston Dynamics", "https://bostondynamics.com/"], ["Agility Robotics", "https://www.agilityrobotics.com/"],
    ["Apptronik", "https://apptronik.com/"], ["1X", "https://www.1x.tech/"], ["Unitree", "https://www.unitree.com/"],
    ["UBTech", "https://www.ubtrobot.com/en/"], ["Humanoid", "https://thehumanoid.ai/"], ["Sanctuary AI", "https://www.sanctuary.ai/"] ] },
  { name: "Next-generation humanoids and robot AI", companies: [
    ["Agibot", "https://www.agibot.com/"], ["Kepler", "https://www.gotokepler.com/"], ["Mentee Robotics", "https://www.menteebot.com/"],
    ["Holiday Robotics", "https://www.holiday-robotics.com/"], ["Rainbow Robotics", "https://www.rainbow-robotics.com/"], ["Skild AI", "https://www.skild.ai/"],
    ["Field AI", "https://fieldai.com/"], ["Dyna Robotics", "https://www.dyna.co/"], ["Agile Robots", "https://www.agile-robots.com/en/"] ] },
  { name: "Industrial, legged, and inspection robots", companies: [
    ["Universal Robots", "https://www.universal-robots.com/"], ["Standard Bots", "https://standardbots.com/"], ["Path Robotics", "https://www.path-robotics.com/"],
    ["Deep Robotics", "https://www.deeprobotics.cn/en"], ["ANYbotics", "https://www.anybotics.com/"], ["Korial", "https://www.korial.com/"],
    ["Gecko Robotics", "https://www.geckorobotics.com/"], ["Dexterity", "https://www.dexterity.ai/"], ["Symbotic", "https://www.symbotic.com/"] ] },
  { name: "Logistics, service, and field robots", companies: [
    ["Locus Robotics", "https://locusrobotics.com/"], ["Diligent Robotics", "https://www.diligentrobots.com/"], ["Serve Robotics", "https://www.serverobotics.com/"],
    ["Starship Technologies", "https://www.starship.xyz/"], ["Hyphen", "https://www.usehyphen.com/"], ["Verdant Robotics", "https://www.verdantrobotics.com/"],
    ["Carbon Robotics", "https://carbonrobotics.com/"], ["iRobot", "https://www.irobot.com/"], ["CMR Surgical", "https://cmrsurgical.com/"] ] },
];
export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

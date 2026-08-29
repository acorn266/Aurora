export type Source =
  | "Vogue"
  | "Pinterest"
  | "Instagram"
  | "Runway"
  | "Lookbook";

export type Category = "Casual" | "Formal" | "Street" | "Evening";

export type Season =
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter";

export type Occasion =
  | "Everyday"
  | "Weekend"
  | "Work"
  | "Date Night"
  | "Party"
  | "Wedding"
  | "Formal Event";

export type Style =
  | "Minimal"
  | "Classic"
  | "Romantic"
  | "Quiet Luxury"
  | "Editorial"
  | "Streetwear"
  | "Modern";

export type Contrast = "low" | "medium" | "high";

export type OutfitItem = {
  name: string;
  color: string;
};

export type Outfit = {
  id: string;
  title: string;
  image: string;
  source: Source;
  category: Category;

  palette: string[];
  items: OutfitItem[];

  season: Season[];
  occasion: Occasion[];
  style: Style[];

  /**
   * -1 = very cool
   *  0 = neutral
   * +1 = very warm
   */
  warmth: number;

  contrast: Contrast;
};

export const CATEGORIES = [
  "All",
  "Casual",
  "Formal",
  "Street",
  "Evening",
] as const;

export const SOURCES: Source[] = [
  "Vogue",
  "Pinterest",
  "Instagram",
  "Runway",
  "Lookbook",
];

/**
 * Pexels image helper.
 *
 * These are deliberately portrait-oriented fashion photographs so the
 * catalogue cards can show the complete outfit rather than a face crop.
 */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop`;

export const outfits: Outfit[] = [
  // ============================================================
  // CASUAL — 10
  // ============================================================

  {
    id: "casual-quiet-blazer",
    title: "Stone Blazer, Easy Denim",
    image: pexels(4816597),
    source: "Lookbook",
    category: "Casual",
    palette: ["#8d7768", "#f1e8da", "#40536a"],
    items: [
      { name: "Soft brown blazer", color: "stone" },
      { name: "White top", color: "ivory" },
      { name: "Straight denim", color: "denim" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Everyday", "Weekend"],
    style: ["Quiet Luxury", "Classic"],
    warmth: 0.35,
    contrast: "medium",
  },

  {
    id: "casual-denim-scarf",
    title: "Denim & Silk Scarf",
    image: pexels(13591720),
    source: "Pinterest",
    category: "Casual",
    palette: ["#3f5872", "#d9a48e", "#efe1cf"],
    items: [
      { name: "Straight-leg denim", color: "denim" },
      { name: "Soft pink top", color: "blush" },
      { name: "Printed silk scarf", color: "terracotta" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Everyday", "Weekend"],
    style: ["Classic", "Romantic"],
    warmth: 0.1,
    contrast: "medium",
  },

  {
    id: "casual-denim-studio",
    title: "Clean Denim, White Shirt",
    image: pexels(8423863),
    source: "Lookbook",
    category: "Casual",
    palette: ["#405875", "#f7f4ec", "#8c735e"],
    items: [
      { name: "Blue denim", color: "denim" },
      { name: "White shirt", color: "white" },
      { name: "Tan belt", color: "camel" },
    ],
    season: ["Spring", "Summer", "Autumn"],
    occasion: ["Everyday", "Weekend"],
    style: ["Minimal", "Classic"],
    warmth: 0.05,
    contrast: "medium",
  },

  {
    id: "casual-city-denim",
    title: "Blue Denim, City Ease",
    image: pexels(15585439),
    source: "Instagram",
    category: "Casual",
    palette: ["#48617b", "#c6b19d", "#f0e8dc"],
    items: [
      { name: "Blue jeans", color: "denim" },
      { name: "Neutral knit", color: "stone" },
      { name: "Leather flats", color: "tan" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Everyday", "Weekend"],
    style: ["Minimal", "Modern"],
    warmth: 0.05,
    contrast: "low",
  },

  {
    id: "casual-black-denim",
    title: "Black Denim, Soft Essentials",
    image: pexels(22223039),
    source: "Lookbook",
    category: "Casual",
    palette: ["#17191d", "#f1eee7", "#7b6d62"],
    items: [
      { name: "Black denim", color: "black" },
      { name: "Cream top", color: "cream" },
      { name: "Tan accessories", color: "camel" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Everyday", "Weekend"],
    style: ["Minimal", "Modern"],
    warmth: 0.0,
    contrast: "high",
  },

  {
    id: "casual-summer-white",
    title: "White Summer Essential",
    image: pexels(29061626),
    source: "Pinterest",
    category: "Casual",
    palette: ["#faf8f2", "#55708a", "#d5b48c"],
    items: [
      { name: "White summer top", color: "white" },
      { name: "Denim shorts", color: "denim" },
      { name: "Leather sandals", color: "tan" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Everyday", "Weekend"],
    style: ["Minimal", "Classic"],
    warmth: 0.2,
    contrast: "medium",
  },

  {
    id: "casual-terrace-denim",
    title: "Soft Denim Weekend",
    image: pexels(7896165),
    source: "Instagram",
    category: "Casual",
    palette: ["#41617d", "#e8ded0", "#b58c68"],
    items: [
      { name: "Blue denim", color: "denim" },
      { name: "Cream casual top", color: "cream" },
      { name: "Tan sandals", color: "camel" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Weekend", "Everyday"],
    style: ["Classic", "Modern"],
    warmth: 0.15,
    contrast: "medium",
  },

  {
    id: "casual-neutral-blazer",
    title: "Neutral Blazer, Modern Ease",
    image: pexels(8989593),
    source: "Lookbook",
    category: "Casual",
    palette: ["#b6a18d", "#292a2d", "#e9e1d5"],
    items: [
      { name: "Neutral blazer", color: "taupe" },
      { name: "Black trousers", color: "black" },
      { name: "Cream knit", color: "cream" },
    ],
    season: ["Autumn", "Spring"],
    occasion: ["Everyday", "Work"],
    style: ["Quiet Luxury", "Modern"],
    warmth: 0.25,
    contrast: "medium",
  },

  {
    id: "casual-blush-denim",
    title: "Blush & Blue Weekend",
    image: pexels(17898449),
    source: "Pinterest",
    category: "Casual",
    palette: ["#d7a2a6", "#45617a", "#f3ede3"],
    items: [
      { name: "Blush top", color: "blush" },
      { name: "Relaxed jeans", color: "denim" },
      { name: "White sneakers", color: "white" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Weekend", "Everyday"],
    style: ["Romantic", "Modern"],
    warmth: 0.1,
    contrast: "medium",
  },

  {
    id: "casual-olive-blazer",
    title: "Olive Tailoring, Soft Layers",
    image: pexels(18609364),
    source: "Lookbook",
    category: "Casual",
    palette: ["#737b59", "#e7ded0", "#3a3d3d"],
    items: [
      { name: "Olive blazer", color: "olive" },
      { name: "Cream top", color: "cream" },
      { name: "Dark trousers", color: "charcoal" },
    ],
    season: ["Autumn", "Spring"],
    occasion: ["Everyday", "Work"],
    style: ["Quiet Luxury", "Modern"],
    warmth: 0.25,
    contrast: "medium",
  },

  // ============================================================
  // FORMAL — 10
  // ============================================================

  {
    id: "formal-grey-power",
    title: "Grey Power Suit",
    image: pexels(982585),
    source: "Vogue",
    category: "Formal",
    palette: ["#8d9295", "#f2efe8", "#20252d"],
    items: [
      { name: "Grey tailored suit", color: "slate" },
      { name: "White shirt", color: "white" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Autumn", "Winter", "Spring"],
    occasion: ["Work", "Formal Event"],
    style: ["Classic", "Editorial"],
    warmth: -0.05,
    contrast: "high",
  },

  {
    id: "formal-black-white",
    title: "Black & White Editorial",
    image: pexels(22687018),
    source: "Runway",
    category: "Formal",
    palette: ["#111216", "#f5f1e8", "#676b73"],
    items: [
      { name: "Black blazer", color: "black" },
      { name: "White tailored shirt", color: "white" },
      { name: "Black trousers", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Editorial", "Minimal"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "formal-brown-suit",
    title: "Chocolate Modern Tailoring",
    image: pexels(37233401),
    source: "Vogue",
    category: "Formal",
    palette: ["#4b3028", "#d9c6ad", "#211f20"],
    items: [
      { name: "Chocolate suit", color: "brown" },
      { name: "Cream blouse", color: "cream" },
      { name: "Dark shoes", color: "espresso" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Quiet Luxury", "Classic"],
    warmth: 0.5,
    contrast: "medium",
  },

  {
    id: "formal-black-vest",
    title: "Black Vest, White Shirt",
    image: pexels(7680180),
    source: "Lookbook",
    category: "Formal",
    palette: ["#15161a", "#f1eee5", "#555a63"],
    items: [
      { name: "Black tailored vest", color: "black" },
      { name: "White shirt", color: "white" },
      { name: "Tailored trousers", color: "charcoal" },
    ],
    season: ["Autumn", "Winter", "Spring"],
    occasion: ["Work", "Formal Event"],
    style: ["Modern", "Minimal"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "formal-black-white-studio",
    title: "Ivory & Black Precision",
    image: pexels(17509222),
    source: "Runway",
    category: "Formal",
    palette: ["#f5f0e5", "#18191c", "#a49b8e"],
    items: [
      { name: "White tailored trousers", color: "ivory" },
      { name: "Black blazer", color: "black" },
      { name: "Minimal heels", color: "black" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Work", "Formal Event"],
    style: ["Editorial", "Minimal"],
    warmth: 0.05,
    contrast: "high",
  },

  {
    id: "formal-blue-dress",
    title: "Cobalt Office Dress",
    image: pexels(6665444),
    source: "Vogue",
    category: "Formal",
    palette: ["#31588b", "#d7d3cb", "#9c332e"],
    items: [
      { name: "Blue structured dress", color: "blue" },
      { name: "Tailored blazer", color: "navy" },
      { name: "Red heels", color: "red" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Work", "Formal Event"],
    style: ["Classic", "Modern"],
    warmth: -0.25,
    contrast: "high",
  },

  {
    id: "formal-black-suit",
    title: "The Black Suit Edit",
    image: pexels(14666436),
    source: "Vogue",
    category: "Formal",
    palette: ["#111216", "#ded6c9", "#2c3036"],
    items: [
      { name: "Black tailored suit", color: "black" },
      { name: "Ivory shirt", color: "ivory" },
      { name: "Black pumps", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Classic", "Quiet Luxury"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "formal-navy-tailoring",
    title: "Navy Tailoring, Soft Light",
    image: pexels(19601319),
    source: "Lookbook",
    category: "Formal",
    palette: ["#1e304b", "#f2eee4", "#9b958b"],
    items: [
      { name: "Navy suit", color: "navy" },
      { name: "White shirt", color: "white" },
      { name: "Neutral handbag", color: "stone" },
    ],
    season: ["Spring", "Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Classic", "Minimal"],
    warmth: -0.15,
    contrast: "high",
  },

  {
    id: "formal-black-elegance",
    title: "Black Suit, Quiet Power",
    image: pexels(34411769),
    source: "Runway",
    category: "Formal",
    palette: ["#121316", "#77726b", "#eee8dc"],
    items: [
      { name: "Black suit", color: "black" },
      { name: "Stone blouse", color: "stone" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Editorial", "Classic"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "formal-blue-suit",
    title: "Midnight Blue Executive",
    image: pexels(14584010),
    source: "Vogue",
    category: "Formal",
    palette: ["#25364d", "#c8b9a6", "#f1ede5"],
    items: [
      { name: "Midnight blue blazer", color: "navy" },
      { name: "Cream turtleneck", color: "cream" },
      { name: "Tailored trousers", color: "navy" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Work", "Formal Event"],
    style: ["Quiet Luxury", "Modern"],
    warmth: -0.1,
    contrast: "medium",
  },

  // ============================================================
  // STREET — 10
  // ============================================================

  {
    id: "street-black-jacket",
    title: "Black Jacket, City Lines",
    image: pexels(7000908),
    source: "Instagram",
    category: "Street",
    palette: ["#1a1b1e", "#777b80", "#d9d1c4"],
    items: [
      { name: "Black jacket", color: "black" },
      { name: "Grey trousers", color: "slate" },
      { name: "Black boots", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Weekend", "Everyday"],
    style: ["Streetwear", "Modern"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "street-plaid-tailoring",
    title: "Plaid Tailoring, City Edge",
    image: pexels(5314599),
    source: "Instagram",
    category: "Street",
    palette: ["#5f5348", "#24282d", "#b7a28b"],
    items: [
      { name: "Plaid blazer", color: "taupe" },
      { name: "Black trousers", color: "black" },
      { name: "Leather handbag", color: "brown" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Weekend", "Everyday"],
    style: ["Streetwear", "Editorial"],
    warmth: 0.2,
    contrast: "high",
  },

  {
    id: "street-blazer-denim",
    title: "Black Blazer, Blue Denim",
    image: pexels(7446543),
    source: "Pinterest",
    category: "Street",
    palette: ["#17191d", "#47617b", "#d8d0c4"],
    items: [
      { name: "Black blazer", color: "black" },
      { name: "Blue denim", color: "denim" },
      { name: "Neutral heels", color: "stone" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Weekend", "Date Night"],
    style: ["Modern", "Streetwear"],
    warmth: 0.0,
    contrast: "high",
  },

  {
    id: "street-leather-city",
    title: "Leather & Longline",
    image: pexels(3643462),
    source: "Runway",
    category: "Street",
    palette: ["#17181b", "#e3d6c6", "#555b62"],
    items: [
      { name: "Black leather layer", color: "black" },
      { name: "Long neutral skirt", color: "stone" },
      { name: "Black tee", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Weekend", "Everyday"],
    style: ["Editorial", "Streetwear"],
    warmth: 0.05,
    contrast: "high",
  },

  {
    id: "street-red-skirt",
    title: "Red Skirt, Black Essential",
    image: pexels(4203432),
    source: "Instagram",
    category: "Street",
    palette: ["#a83d39", "#17191b", "#6c8060"],
    items: [
      { name: "Red midi skirt", color: "red" },
      { name: "Black long-sleeve top", color: "black" },
      { name: "Dark shoes", color: "black" },
    ],
    season: ["Spring", "Summer", "Autumn"],
    occasion: ["Weekend", "Date Night"],
    style: ["Modern", "Editorial"],
    warmth: 0.25,
    contrast: "high",
  },

  {
    id: "street-yellow-skirt",
    title: "Ochre Street Light",
    image: pexels(5389153),
    source: "Instagram",
    category: "Street",
    palette: ["#d2a329", "#536f86", "#2d302e"],
    items: [
      { name: "Ochre skirt", color: "ochre" },
      { name: "Soft blue top", color: "blue" },
      { name: "Dark sandals", color: "black" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Weekend", "Everyday"],
    style: ["Streetwear", "Romantic"],
    warmth: 0.45,
    contrast: "high",
  },

  {
    id: "street-floral-city",
    title: "Floral City Stroll",
    image: pexels(5290526),
    source: "Pinterest",
    category: "Street",
    palette: ["#d4a0a0", "#f2e8d9", "#6e805d"],
    items: [
      { name: "Floral skirt", color: "blush" },
      { name: "Ivory blouse", color: "ivory" },
      { name: "Neutral sandals", color: "tan" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Weekend", "Date Night"],
    style: ["Romantic", "Classic"],
    warmth: 0.25,
    contrast: "medium",
  },

  {
    id: "street-black-white",
    title: "Monochrome Street Uniform",
    image: pexels(6520931),
    source: "Lookbook",
    category: "Street",
    palette: ["#17191d", "#f0ece3", "#75777b"],
    items: [
      { name: "Black tailored pants", color: "black" },
      { name: "White top", color: "white" },
      { name: "Structured blazer", color: "black" },
    ],
    season: ["Autumn", "Winter", "Spring"],
    occasion: ["Everyday", "Weekend"],
    style: ["Minimal", "Streetwear"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "street-pink-jacket",
    title: "Soft Pink, Dark Mini",
    image: pexels(13591720),
    source: "Instagram",
    category: "Street",
    palette: ["#d9a4aa", "#24272d", "#e7dfd2"],
    items: [
      { name: "Pink statement layer", color: "blush" },
      { name: "Dark skirt", color: "charcoal" },
      { name: "Neutral accessories", color: "stone" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Weekend", "Date Night"],
    style: ["Modern", "Editorial"],
    warmth: 0.15,
    contrast: "medium",
  },

  {
    id: "street-cobalt-city",
    title: "Cobalt City Layers",
    image: pexels(5290534),
    source: "Runway",
    category: "Street",
    palette: ["#24537d", "#e6d5c1", "#1e2227"],
    items: [
      { name: "Cobalt blouse", color: "cobalt" },
      { name: "Neutral skirt", color: "stone" },
      { name: "Black shoes", color: "black" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Everyday", "Weekend"],
    style: ["Editorial", "Modern"],
    warmth: -0.15,
    contrast: "high",
  },

  // ============================================================
  // EVENING — 10
  // ============================================================

  {
    id: "evening-blue-gown",
    title: "Midnight Blue Gown",
    image: pexels(3534557),
    source: "Runway",
    category: "Evening",
    palette: ["#315a83", "#c8b69e", "#171b22"],
    items: [
      { name: "Blue evening gown", color: "navy" },
      { name: "Gold jewellery", color: "gold" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Summer", "Autumn"],
    occasion: ["Party", "Formal Event"],
    style: ["Romantic", "Editorial"],
    warmth: -0.1,
    contrast: "high",
  },

  {
    id: "evening-ruffled-black",
    title: "Black Ruffle Evening",
    image: pexels(5857631),
    source: "Runway",
    category: "Evening",
    palette: ["#17181b", "#c9b9a7", "#eee6d8"],
    items: [
      { name: "Black ruffled gown", color: "black" },
      { name: "Pearl jewellery", color: "ivory" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Formal Event"],
    style: ["Romantic", "Editorial"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "evening-gold-gown",
    title: "Champagne After Dark",
    image: pexels(5857621),
    source: "Vogue",
    category: "Evening",
    palette: ["#d8bf91", "#f0e4d1", "#6c4434"],
    items: [
      { name: "Champagne gown", color: "champagne" },
      { name: "Gold earrings", color: "gold" },
      { name: "Brown heels", color: "brown" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Wedding", "Formal Event"],
    style: ["Romantic", "Quiet Luxury"],
    warmth: 0.65,
    contrast: "medium",
  },

  {
    id: "evening-sparkle-black",
    title: "Black Sparkle, Midnight",
    image: pexels(7581698),
    source: "Runway",
    category: "Evening",
    palette: ["#111216", "#6b7280", "#d9c7a9"],
    items: [
      { name: "Black sparkle dress", color: "black" },
      { name: "Teal heels", color: "teal" },
      { name: "Gold jewellery", color: "gold" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Date Night"],
    style: ["Editorial", "Modern"],
    warmth: 0.05,
    contrast: "high",
  },

  {
    id: "evening-monochrome",
    title: "Monochrome Evening",
    image: pexels(5607520),
    source: "Runway",
    category: "Evening",
    palette: ["#18191c", "#e6e1d8", "#8c8d91"],
    items: [
      { name: "Black evening dress", color: "black" },
      { name: "Silver accessories", color: "silver" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Formal Event"],
    style: ["Minimal", "Editorial"],
    warmth: 0,
    contrast: "high",
  },

  {
    id: "evening-black-shoulder",
    title: "Black Off-Shoulder Evening",
    image: pexels(7582314),
    source: "Vogue",
    category: "Evening",
    palette: ["#15161a", "#bca895", "#eee6d9"],
    items: [
      { name: "Black evening dress", color: "black" },
      { name: "Neutral heels", color: "stone" },
      { name: "Gold jewellery", color: "gold" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Date Night", "Party"],
    style: ["Romantic", "Editorial"],
    warmth: 0.1,
    contrast: "high",
  },

  {
    id: "evening-romantic-black",
    title: "Romantic Black Gown",
    image: pexels(5222385),
    source: "Lookbook",
    category: "Evening",
    palette: ["#17181b", "#c5b4a1", "#756258"],
    items: [
      { name: "Long black gown", color: "black" },
      { name: "Pearl necklace", color: "ivory" },
      { name: "Black heels", color: "black" },
    ],
    season: ["Autumn", "Winter"],
    occasion: ["Date Night", "Formal Event"],
    style: ["Romantic", "Classic"],
    warmth: 0.05,
    contrast: "high",
  },

  {
    id: "evening-cobalt-dress",
    title: "Cobalt Evening Light",
    image: pexels(10406624),
    source: "Vogue",
    category: "Evening",
    palette: ["#315b9a", "#b83b36", "#eee7db"],
    items: [
      { name: "Cobalt dress", color: "cobalt" },
      { name: "Red heels", color: "red" },
      { name: "Silver jewellery", color: "silver" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Party", "Date Night"],
    style: ["Modern", "Editorial"],
    warmth: -0.15,
    contrast: "high",
  },

  {
    id: "evening-bridal-light",
    title: "Ivory Ceremony Edit",
    image: pexels(4545143),
    source: "Vogue",
    category: "Evening",
    palette: ["#f3eee4", "#d9c2a1", "#8e7764"],
    items: [
      { name: "Ivory gown", color: "ivory" },
      { name: "Gold jewellery", color: "gold" },
      { name: "Nude heels", color: "nude" },
    ],
    season: ["Spring", "Summer"],
    occasion: ["Wedding", "Formal Event"],
    style: ["Romantic", "Quiet Luxury"],
    warmth: 0.45,
    contrast: "low",
  },

  {
    id: "evening-rose-gown",
    title: "Rose Silk Evening",
    image: pexels(4760120),
    source: "Pinterest",
    category: "Evening",
    palette: ["#a94543", "#d8b49d", "#6d5546"],
    items: [
      { name: "Rose red gown", color: "rose" },
      { name: "Neutral heels", color: "nude" },
      { name: "Gold earrings", color: "gold" },
    ],
    season: ["Spring", "Autumn"],
    occasion: ["Date Night", "Party"],
    style: ["Romantic", "Modern"],
    warmth: 0.45,
    contrast: "medium",
  },
];
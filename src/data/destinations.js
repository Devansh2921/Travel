const destinations = [
    {
        name: "Almaty",
        slug: "almaty",
        country: "Kazakhstan",
        tag: "Adventure",
        description:
            "A city where Soviet-era grandeur meets the raw beauty of the Tian Shan mountains. Almaty offers lush canyons, glittering alpine lakes, and a cosmopolitan café culture — the perfect blend of urban and wild.",
        heroImg: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=600&q=80",
        packages: [
            { title: "A Blend of City Charms and Natural Wonders", duration: "4 Nights", price: "Starting from $549" },
            { title: "Discover Issyk Lake, Canyons, and Cultural Charms", duration: "4 Nights", price: "Starting from $579" },
            { title: "A Journey Through Mountains, Culture, and Scenic Wonders", duration: "5 Nights", price: "Starting from $649" },
            { title: "From City Charms to Mountain Peaks and Hidden Canyons", duration: "5 Nights", price: "Starting from $699" },
            { title: "Unveiling City Charms, Canyons, and Scenic Escapes", duration: "6 Nights", price: "Starting from $849" },
            { title: "From Shymbulak Peaks to Canyons and Lakes", duration: "6 Nights", price: "Starting from $899" },
        ],
    },
    {
        name: "Bali",
        slug: "bali",
        country: "Indonesia",
        tag: "Romance",
        description:
            "The Island of the Gods enchants with emerald rice terraces, ancient sea temples, and a culture that elevates every sunrise into a ceremony. Whether seeking romance, adventure, or stillness — Bali delivers it in extraordinary measure.",
        heroImg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
        packages: [
            { title: "Romantic Bali Escape | Ubud Culture & Private Candlelight Evening", duration: "5N 6D", price: "Starting from $899" },
            { title: "Serene Bali Escape | Love, Luxury & Adventure", duration: "5N 6D", price: "Starting from $950" },
            { title: "Island Romance | Traditions & Tropical Shores", duration: "6N 7D", price: "Starting from $1,050" },
            { title: "Serene Bali Getaway | A Honeymooners Delight", duration: "6N 7D", price: "Starting from $1,100" },
            { title: "Nusa Penida Getaway | Scenic Peaks & Ocean Wonders", duration: "6N 7D", price: "Starting from $1,150" },
            { title: "Bali Horizon Escape | Culture, Cliffs & Crystal Waters", duration: "6N 7D", price: "Starting from $1,200" },
        ],
    },
    {
        name: "Dubai",
        slug: "dubai",
        country: "UAE",
        tag: "Luxury",
        description:
            "A city that turned desert into spectacle. Dubai is the world's most audacious luxury destination — where gold-plated everything meets silent desert dunes, rooftop infinity pools, and the tallest tower on earth.",
        heroImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
        packages: [
            { title: "Glamorous Dubai Escape | City Highlights & Luxury Cruise", duration: "4N 5D", price: "Starting from $1,099" },
            { title: "Love in Dubai | Resort Luxury & Complimentary Park Experiences", duration: "4N 5D", price: "Starting from $1,199" },
            { title: "Arabian Honeymoon Bliss | Desert Dunes & Iconic Views", duration: "5N 6D", price: "Starting from $1,399" },
            { title: "Luxury Dubai | Burj Khalifa & Marina Nights", duration: "5N 6D", price: "Starting from $1,499" },
        ],
    },
    {
        name: "Northern Lights",
        slug: "northern-lights",
        country: "Scandinavia",
        tag: "Magical",
        description:
            "Few spectacles on Earth rival the aurora borealis dancing across an Arctic sky. Experience glass igloos, frozen fjords, reindeer sleigh rides, and the profound silence of Lapland's snow-laden wilderness.",
        heroImg: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
        packages: [
            { title: "Scandinavian Splendour | Oslo & Tromsø Discovery", duration: "6N 7D", price: "Starting from $1,899" },
            { title: "Scandinavian Arctic Bliss | Lights & Fjord Landscapes", duration: "10N 11D", price: "Starting from $2,999" },
            { title: "Lapland Dreams | Helsinki to Rovaniemi Escape", duration: "5N 6D", price: "Starting from $1,699" },
        ],
    },
    {
        name: "Hong Kong",
        slug: "hongkong",
        country: "China SAR",
        tag: "City",
        description:
            "A vertical city of extraordinary contrasts — gleaming skyscrapers reflected in Victoria Harbour, ancient incense-filled temples wedged between financial towers, and dim sum breakfasts that last half a day.",
        heroImg: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80",
        packages: [
            { title: "Hong Kong Highlights | Harbour, Hills & Heritage", duration: "4N 5D", price: "Starting from $799" },
            { title: "City & Lantau Island Escape | Big Buddha & Malls", duration: "5N 6D", price: "Starting from $949" },
            { title: "Ultimate HK Experience | Macau Day Trip Included", duration: "6N 7D", price: "Starting from $1,199" },
        ],
    },
    {
        name: "Japan",
        slug: "japan",
        country: "Japan",
        tag: "Culture",
        description:
            "A country of exquisite contradictions — ancient Shinto shrines beside neon-lit arcades, bullet trains through bamboo forests, and a culinary culture so refined it elevates ramen to fine art.",
        heroImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
        packages: [
            { title: "Cherry Blossom Trail | Tokyo & Kyoto", duration: "6N 7D", price: "Starting from $1,499" },
            { title: "Fuji & Osaka Adventure | Culture & Cuisine", duration: "7N 8D", price: "Starting from $1,699" },
            { title: "Zen Japan | Ryokan, Temples & Tea Ceremony", duration: "8N 9D", price: "Starting from $1,999" },
            { title: "Japan Grand Tour | Tokyo, Kyoto, Hiroshima & Nara", duration: "10N 11D", price: "Starting from $2,499" },
        ],
    },
    {
        name: "Malaysia",
        slug: "malaysia",
        country: "Malaysia",
        tag: "Nature",
        description:
            "From the glittering twin towers of Kuala Lumpur to ancient rainforests older than the Amazon, Malaysia is a sensory feast — multi-ethnic street food, colonial hill stations, and pristine coral islands.",
        heroImg: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
        packages: [
            { title: "Kuala Lumpur City Break | Towers & Culture", duration: "3N 4D", price: "Starting from $449" },
            { title: "Malaysia & Langkawi | City + Beach Escape", duration: "5N 6D", price: "Starting from $749" },
            { title: "Borneo Adventure | Rainforest & Wildlife", duration: "6N 7D", price: "Starting from $1,099" },
        ],
    },
    {
        name: "Singapore",
        slug: "singapore",
        country: "Singapore",
        tag: "Modern",
        description:
            "The world's most efficient city-state is also its most inventive. Gardens by the Bay glows at night, hawker centres serve Michelin-starred dishes at street prices, and the skyline looks like it was designed in the future.",
        heroImg: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
        packages: [
            { title: "Singapore Icons | Marina Bay & Sentosa", duration: "3N 4D", price: "Starting from $699" },
            { title: "Family Fun in Singapore | Universal Studios & Gardens", duration: "4N 5D", price: "Starting from $899" },
            { title: "Singapore & Bintan | City + Island Retreat", duration: "5N 6D", price: "Starting from $1,099" },
        ],
    },
    {
        name: "Greece",
        slug: "greece",
        country: "Greece",
        tag: "History",
        description:
            "Birthplace of democracy, philosophy, and the world's most photogenic sunsets. Greece's whitewashed villages cascade down volcanic cliffs above an impossibly blue Aegean Sea — a landscape that feels mythological.",
        heroImg: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
        packages: [
            { title: "Santorini Romance | Sunsets & Aegean Blues", duration: "5N 6D", price: "Starting from $1,599" },
            { title: "Athens & Mykonos | Heritage & Beaches", duration: "7N 8D", price: "Starting from $1,999" },
            { title: "Greek Island Hopper | Santorini, Mykonos & Crete", duration: "9N 10D", price: "Starting from $2,599" },
            { title: "Luxury Greece | Private Villas & Yacht Day Trip", duration: "7N 8D", price: "Starting from $3,299" },
        ],
    },
    {
        name: "Paris",
        slug: "paris",
        country: "France",
        tag: "Romance",
        description:
            "The City of Light has enchanted lovers, artists, and dreamers for centuries. Haussmann's boulevards, the Iron Lady glittering at midnight, and a croissant eaten standing at a zinc bar — Paris is an eternal feeling.",
        heroImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
        packages: [
            { title: "Paris Romantic Escape | Eiffel & Versailles", duration: "4N 5D", price: "Starting from $1,299" },
            { title: "Paris & Loire Valley | Art, Wine & Chateaux", duration: "6N 7D", price: "Starting from $1,799" },
            { title: "Grand European | Paris, Amsterdam & Brussels", duration: "8N 9D", price: "Starting from $2,199" },
        ],
    },
    {
        name: "Switzerland",
        slug: "switzerland",
        country: "Switzerland",
        tag: "Scenic",
        description:
            "A land of impossible postcards made real — the Jungfrau summit piercing clouds, mirror lakes reflecting the Matterhorn, and cogwheel trains climbing through meadows so green they seem painted.",
        heroImg: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
        packages: [
            { title: "Alpine Dream | Jungfrau & Interlaken", duration: "6N 7D", price: "Starting from $2,199" },
            { title: "Swiss Scenic Rail | Glacier Express Journey", duration: "7N 8D", price: "Starting from $2,599" },
            { title: "Luxury Swiss Retreat | Zermatt & Geneva", duration: "8N 9D", price: "Starting from $3,199" },
        ],
    },
    {
        name: "Russia",
        slug: "russia",
        country: "Russia",
        tag: "Culture",
        description:
            "From the gilded onion domes of Red Square to the mind-bending art collections of the Hermitage, Russia's imperial cities deliver grandeur on a scale found nowhere else — history you can walk through.",
        heroImg: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80",
        packages: [
            { title: "Moscow & St. Petersburg | Twin Imperial Cities", duration: "7N 8D", price: "Starting from $1,199" },
            { title: "Trans-Siberian Express | Epic Rail Adventure", duration: "12N 13D", price: "Starting from $2,499" },
            { title: "Golden Ring | Ancient Monasteries & Villages", duration: "5N 6D", price: "Starting from $899" },
        ],
    },
    {
        name: "Mauritius",
        slug: "mauritius",
        country: "Mauritius",
        tag: "Beach",
        description:
            "An island so beautiful Darwin called it the 'Garden of Eden'. Mauritius wraps powder-white beaches in a lagoon of every shade of turquoise, topped with world-class resorts and Creole cuisine of extraordinary depth.",
        heroImg: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=600&q=80",
        packages: [
            { title: "Island Bliss | Beaches & Water Sports", duration: "5N 6D", price: "Starting from $1,299" },
            { title: "Luxury Mauritius | 5-Star Resort & Spa Escape", duration: "6N 7D", price: "Starting from $1,899" },
            { title: "Honeymoon in Paradise | Private Villas & Sunset Cruises", duration: "7N 8D", price: "Starting from $2,399" },
        ],
    },
    {
        name: "Thailand",
        slug: "thailand",
        country: "Thailand",
        tag: "Exotic",
        description:
            "The Land of Smiles delivers every kind of travel fantasy — emerald jungle islands, gilded temples draped in monks' saffron robes, night markets of thousand-year-old recipes, and beach clubs that face perfect sunsets.",
        heroImg: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
        packages: [
            { title: "Phuket Paradise | Beaches & Night Life", duration: "4N 5D", price: "Starting from $699" },
            { title: "Bangkok & Chiang Mai | Culture & Temples", duration: "6N 7D", price: "Starting from $949" },
            { title: "Thai Islands | Koh Samui & Koh Phangan", duration: "6N 7D", price: "Starting from $1,049" },
            { title: "Luxury Thailand | Private Pool Villas & Wellness Retreat", duration: "8N 9D", price: "Starting from $1,699" },
        ],
    },
    {
        name: "Turkey",
        slug: "turkey",
        country: "Turkey",
        tag: "Heritage",
        description:
            "Where continents collide and civilisations overlap. Turkey offers hot air balloons over Cappadocia's fairy chimneys at dawn, Istanbul's Byzantine mosaics, and a turquoise coast untouched by time.",
        heroImg: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600&q=80",
        packages: [
            { title: "Istanbul & Cappadocia | Hot Air & Heritage", duration: "6N 7D", price: "Starting from $1,099" },
            { title: "Turquoise Coast Gulet | Aegean Sailing", duration: "7N 8D", price: "Starting from $1,499" },
            { title: "Grand Turkey | Istanbul, Cappadocia & Pamukkale", duration: "9N 10D", price: "Starting from $1,799" },
        ],
    },
    {
        name: "Vietnam",
        slug: "vietnam",
        country: "Vietnam",
        tag: "Discover",
        description:
            "A country of remarkable variety — Ha Long Bay's limestone karsts rising from jade water, Hoi An's ancient lantern-lit alleyways, and a food culture so vibrant and regional that every city is a completely different meal.",
        heroImg: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=1400&q=85",
        cardImg: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=600&q=80",
        packages: [
            { title: "Ha Long Bay & Hanoi Discovery", duration: "5N 6D", price: "Starting from $749" },
            { title: "Vietnam North to South | Hanoi, Hue, Hoi An & Saigon", duration: "9N 10D", price: "Starting from $1,199" },
            { title: "Luxury Vietnam | Private Junk & Resort Stay", duration: "7N 8D", price: "Starting from $1,599" },
        ],
    },
];

export default destinations;

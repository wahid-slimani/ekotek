// Sample Dashboard Data
const dashboardData = {
    kpis: {
        totalWaste: {
            value: 2847,
            unit: 'kg',
            change: -12.3,
            trend: [120, 115, 130, 125, 118, 110, 105]
        },
        wasteCost: {
            value: 18240,
            unit: '$',
            change: -8.5,
            trend: [800, 750, 820, 780, 760, 720, 690]
        },
        recyclingRate: {
            value: 67.8,
            unit: '%',
            change: 4.2,
            progress: 67.8
        },
        wastePerCustomer: {
            value: 0.42,
            unit: 'kg',
            change: -6.1,
            trend: [0.48, 0.46, 0.44, 0.43, 0.42, 0.41, 0.40]
        },
        co2Impact: {
            value: 4230,
            unit: 'kg CO₂e',
            change: -15.2,
            trend: [200, 190, 185, 180, 175, 165, 160]
        },
        goalProgress: {
            value: 78,
            unit: '%',
            target: 100,
            label: 'On track to 20% reduction'
        }
    },

    wasteOverTime: [
        { date: '2026-01-09', total: 120, food: 85, recyclables: 35 },
        { date: '2026-01-10', total: 115, food: 82, recyclables: 33 },
        { date: '2026-01-11', total: 130, food: 92, recyclables: 38 },
        { date: '2026-01-12', total: 125, food: 88, recyclables: 37 },
        { date: '2026-01-13', total: 118, food: 84, recyclables: 34 },
        { date: '2026-01-14', total: 110, food: 78, recyclables: 32 },
        { date: '2026-01-15', total: 105, food: 74, recyclables: 31 },
        { date: '2026-01-16', total: 122, food: 86, recyclables: 36 },
        { date: '2026-01-17', total: 128, food: 90, recyclables: 38 },
        { date: '2026-01-18', total: 112, food: 80, recyclables: 32 },
        { date: '2026-01-19', total: 108, food: 76, recyclables: 32 },
        { date: '2026-01-20', total: 116, food: 82, recyclables: 34 },
        { date: '2026-01-21', total: 119, food: 84, recyclables: 35 },
        { date: '2026-01-22', total: 113, food: 80, recyclables: 33 },
        { date: '2026-01-23', total: 107, food: 76, recyclables: 31 },
        { date: '2026-01-24', total: 102, food: 72, recyclables: 30 },
        { date: '2026-01-25', total: 114, food: 81, recyclables: 33 },
        { date: '2026-01-26', total: 118, food: 83, recyclables: 35 },
        { date: '2026-01-27', total: 111, food: 79, recyclables: 32 },
        { date: '2026-01-28', total: 106, food: 75, recyclables: 31 },
        { date: '2026-01-29', total: 109, food: 77, recyclables: 32 },
        { date: '2026-01-30', total: 115, food: 81, recyclables: 34 },
        { date: '2026-01-31', total: 110, food: 78, recyclables: 32 },
        { date: '2026-02-01', total: 104, food: 74, recyclables: 30 },
        { date: '2026-02-02', total: 98, food: 70, recyclables: 28 },
        { date: '2026-02-03', total: 112, food: 79, recyclables: 33 },
        { date: '2026-02-04', total: 108, food: 76, recyclables: 32 },
        { date: '2026-02-05', total: 103, food: 73, recyclables: 30 },
        { date: '2026-02-06', total: 99, food: 70, recyclables: 29 },
        { date: '2026-02-07', total: 105, food: 74, recyclables: 31 }
    ],

    topWastedDishes: [
        { name: 'Ribeye Steak', waste_kg: 45.2, cost: 580, severity: 'high' },
        { name: 'Caesar Salad', waste_kg: 38.7, cost: 290, severity: 'high' },
        { name: 'Pasta Carbonara', waste_kg: 32.1, cost: 245, severity: 'medium' },
        { name: 'Grilled Salmon', waste_kg: 28.5, cost: 380, severity: 'high' },
        { name: 'French Fries', waste_kg: 26.8, cost: 120, severity: 'medium' },
        { name: 'Margherita Pizza', waste_kg: 24.3, cost: 185, severity: 'medium' },
        { name: 'Chicken Alfredo', waste_kg: 22.7, cost: 210, severity: 'medium' },
        { name: 'Lobster Bisque', waste_kg: 19.4, cost: 295, severity: 'high' },
        { name: 'Chocolate Cake', waste_kg: 17.2, cost: 165, severity: 'low' },
        { name: 'Vegetable Stir Fry', waste_kg: 15.8, cost: 95, severity: 'low' }
    ],

    wasteBySource: [
        { source: 'Prep', percentage: 45, kg: 1281 },
        { source: 'Plate Waste', percentage: 30, kg: 854 },
        { source: 'Inventory', percentage: 25, kg: 712 }
    ],

    wasteComposition: [
        { week: 'Week 1', organic: 450, plastic: 120, paper: 80, glass: 45, metal: 30 },
        { week: 'Week 2', organic: 420, plastic: 110, paper: 75, glass: 40, metal: 28 },
        { week: 'Week 3', organic: 440, plastic: 115, paper: 78, glass: 42, metal: 29 },
        { week: 'Week 4', organic: 410, plastic: 105, paper: 72, glass: 38, metal: 26 }
    ],

    predictions: [
        { date: '2026-02-01', actual: 104, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-02', actual: 98, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-03', actual: 112, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-04', actual: 108, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-05', actual: 103, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-06', actual: 99, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-07', actual: 105, predicted: null, confidence_low: null, confidence_high: null },
        { date: '2026-02-08', actual: null, predicted: 108, confidence_low: 95, confidence_high: 121 },
        { date: '2026-02-09', actual: null, predicted: 106, confidence_low: 93, confidence_high: 119 },
        { date: '2026-02-10', actual: null, predicted: 103, confidence_low: 90, confidence_high: 116 },
        { date: '2026-02-11', actual: null, predicted: 110, confidence_low: 97, confidence_high: 123 },
        { date: '2026-02-12', actual: null, predicted: 107, confidence_low: 94, confidence_high: 120 },
        { date: '2026-02-13', actual: null, predicted: 104, confidence_low: 91, confidence_high: 117 },
        { date: '2026-02-14', actual: null, predicted: 101, confidence_low: 88, confidence_high: 114 }
    ],

    locationPerformance: [
        {
            name: 'Downtown Flagship',
            totalWaste: 450,
            foodWaste: 320,
            recyclingRate: 72,
            cost: 2890,
            trend: [48, 46, 45, 44, 43],
            status: 'good'
        },
        {
            name: 'Westside Bistro',
            totalWaste: 380,
            foodWaste: 270,
            recyclingRate: 68,
            cost: 2450,
            trend: [42, 40, 38, 37, 38],
            status: 'good'
        },
        {
            name: 'East End Eatery',
            totalWaste: 520,
            foodWaste: 390,
            recyclingRate: 58,
            cost: 3340,
            trend: [55, 54, 53, 52, 52],
            status: 'moderate'
        },
        {
            name: 'Midtown Grille',
            totalWaste: 420,
            foodWaste: 295,
            recyclingRate: 70,
            cost: 2680,
            trend: [45, 44, 43, 42, 42],
            status: 'good'
        },
        {
            name: 'Harbor View',
            totalWaste: 480,
            foodWaste: 340,
            recyclingRate: 65,
            cost: 3080,
            trend: [50, 49, 48, 48, 48],
            status: 'moderate'
        },
        {
            name: 'Airport Terminal',
            totalWaste: 620,
            foodWaste: 480,
            recyclingRate: 52,
            cost: 3980,
            trend: [65, 64, 63, 63, 62],
            status: 'bad'
        },
        {
            name: 'University District',
            totalWaste: 350,
            foodWaste: 250,
            recyclingRate: 74,
            cost: 2240,
            trend: [38, 36, 35, 35, 35],
            status: 'good'
        },
        {
            name: 'Old Town Cafe',
            totalWaste: 290,
            foodWaste: 210,
            recyclingRate: 76,
            cost: 1860,
            trend: [32, 31, 30, 29, 29],
            status: 'good'
        },
        {
            name: 'Riverside Restaurant',
            totalWaste: 440,
            foodWaste: 315,
            recyclingRate: 67,
            cost: 2820,
            trend: [47, 46, 45, 44, 44],
            status: 'good'
        },
        {
            name: 'Hilltop Dining',
            totalWaste: 510,
            foodWaste: 370,
            recyclingRate: 60,
            cost: 3270,
            trend: [54, 53, 52, 51, 51],
            status: 'moderate'
        },
        {
            name: 'Lakeside Lounge',
            totalWaste: 390,
            foodWaste: 280,
            recyclingRate: 69,
            cost: 2500,
            trend: [42, 41, 40, 39, 39],
            status: 'good'
        },
        {
            name: 'Garden District',
            totalWaste: 330,
            foodWaste: 240,
            recyclingRate: 73,
            cost: 2120,
            trend: [36, 35, 34, 33, 33],
            status: 'good'
        }
    ],

    recentEvents: [
        {
            datetime: '2026-02-08 18:45',
            location: 'Downtown Flagship',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Ribeye Steak',
            amount: 2.3,
            cost: 29.50,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 18:32',
            location: 'Westside Bistro',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Caesar Salad Mix',
            amount: 1.8,
            cost: 12.40,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 18:20',
            location: 'Airport Terminal',
            wasteType: 'Plastic',
            source: 'Inventory',
            item: 'Water Bottles',
            amount: 3.5,
            cost: 8.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 18:05',
            location: 'Harbor View',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Lobster Bisque',
            amount: 1.2,
            cost: 18.30,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 17:52',
            location: 'Midtown Grille',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Vegetables',
            amount: 2.1,
            cost: 6.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 17:40',
            location: 'Downtown Flagship',
            wasteType: 'Paper',
            source: 'Inventory',
            item: 'Napkins',
            amount: 0.8,
            cost: 2.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 17:28',
            location: 'East End Eatery',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Pasta Carbonara',
            amount: 1.9,
            cost: 14.20,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 17:15',
            location: 'University District',
            wasteType: 'Food',
            source: 'Prep',
            item: 'French Fries',
            amount: 1.5,
            cost: 4.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 17:02',
            location: 'Old Town Cafe',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Expired Dairy',
            amount: 2.7,
            cost: 16.80,
            status: 'critical'
        },
        {
            datetime: '2026-02-08 16:48',
            location: 'Riverside Restaurant',
            wasteType: 'Glass',
            source: 'Inventory',
            item: 'Broken Bottles',
            amount: 1.4,
            cost: 3.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 16:35',
            location: 'Hilltop Dining',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Grilled Salmon',
            amount: 1.6,
            cost: 21.40,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 16:20',
            location: 'Lakeside Lounge',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Vegetables',
            amount: 1.3,
            cost: 5.60,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 16:08',
            location: 'Garden District',
            wasteType: 'Metal',
            source: 'Inventory',
            item: 'Aluminum Cans',
            amount: 0.9,
            cost: 1.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 15:55',
            location: 'Downtown Flagship',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Chocolate Cake',
            amount: 0.7,
            cost: 8.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 15:42',
            location: 'Airport Terminal',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Sandwiches',
            amount: 3.2,
            cost: 19.60,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 15:28',
            location: 'Westside Bistro',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Margherita Pizza',
            amount: 1.1,
            cost: 9.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 15:15',
            location: 'Harbor View',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Expired Produce',
            amount: 2.4,
            cost: 14.50,
            status: 'critical'
        },
        {
            datetime: '2026-02-08 15:02',
            location: 'Midtown Grille',
            wasteType: 'Plastic',
            source: 'Inventory',
            item: 'Containers',
            amount: 1.2,
            cost: 3.40,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 14:48',
            location: 'East End Eatery',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Chicken',
            amount: 1.9,
            cost: 11.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 14:35',
            location: 'University District',
            wasteType: 'Paper',
            source: 'Inventory',
            item: 'Boxes',
            amount: 0.6,
            cost: 1.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 14:22',
            location: 'Downtown Flagship',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Sushi Rolls',
            amount: 1.4,
            cost: 18.90,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 14:10',
            location: 'Westside Bistro',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Bread',
            amount: 2.2,
            cost: 8.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 13:58',
            location: 'East End Eatery',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Nachos',
            amount: 1.7,
            cost: 11.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 13:45',
            location: 'Harbor View',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Seafood Mix',
            amount: 3.1,
            cost: 42.50,
            status: 'critical'
        },
        {
            datetime: '2026-02-08 13:32',
            location: 'Midtown Grille',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Potatoes',
            amount: 1.9,
            cost: 5.40,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 13:20',
            location: 'Airport Terminal',
            wasteType: 'Plastic',
            source: 'Inventory',
            item: 'Utensils',
            amount: 0.8,
            cost: 2.10,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 13:08',
            location: 'University District',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Burger',
            amount: 1.2,
            cost: 9.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 12:55',
            location: 'Old Town Cafe',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Soup Base',
            amount: 2.5,
            cost: 11.30,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 12:42',
            location: 'Riverside Restaurant',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Risotto',
            amount: 1.6,
            cost: 13.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 12:30',
            location: 'Hilltop Dining',
            wasteType: 'Glass',
            source: 'Inventory',
            item: 'Wine Bottles',
            amount: 2.1,
            cost: 4.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 12:18',
            location: 'Lakeside Lounge',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Salad Greens',
            amount: 1.3,
            cost: 6.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 12:05',
            location: 'Garden District',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Quiche',
            amount: 0.9,
            cost: 7.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 11:52',
            location: 'Downtown Flagship',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Expired Meat',
            amount: 4.2,
            cost: 56.40,
            status: 'critical'
        },
        {
            datetime: '2026-02-08 11:40',
            location: 'Westside Bistro',
            wasteType: 'Paper',
            source: 'Inventory',
            item: 'Menus',
            amount: 0.5,
            cost: 1.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 11:28',
            location: 'East End Eatery',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Pasta',
            amount: 2.3,
            cost: 9.60,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 11:15',
            location: 'Harbor View',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Crab Cakes',
            amount: 1.1,
            cost: 16.50,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 11:02',
            location: 'Midtown Grille',
            wasteType: 'Metal',
            source: 'Inventory',
            item: 'Cans',
            amount: 1.4,
            cost: 2.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 10:50',
            location: 'Airport Terminal',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Coffee Grounds',
            amount: 3.8,
            cost: 7.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 10:38',
            location: 'University District',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Pancakes',
            amount: 1.5,
            cost: 6.90,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 10:25',
            location: 'Old Town Cafe',
            wasteType: 'Plastic',
            source: 'Inventory',
            item: 'Straws',
            amount: 0.3,
            cost: 0.80,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 10:12',
            location: 'Riverside Restaurant',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Fruit',
            amount: 1.8,
            cost: 8.40,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 10:00',
            location: 'Hilltop Dining',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Expired Eggs',
            amount: 2.6,
            cost: 12.80,
            status: 'critical'
        },
        {
            datetime: '2026-02-08 09:48',
            location: 'Lakeside Lounge',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Omelette',
            amount: 0.8,
            cost: 5.60,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 09:35',
            location: 'Garden District',
            wasteType: 'Paper',
            source: 'Inventory',
            item: 'Napkins',
            amount: 0.7,
            cost: 1.90,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 09:22',
            location: 'Downtown Flagship',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Bacon',
            amount: 1.4,
            cost: 11.20,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 09:10',
            location: 'Westside Bistro',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Toast',
            amount: 1.0,
            cost: 3.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 08:58',
            location: 'East End Eatery',
            wasteType: 'Food',
            source: 'Inventory',
            item: 'Yogurt',
            amount: 1.6,
            cost: 7.80,
            status: 'alert'
        },
        {
            datetime: '2026-02-08 08:45',
            location: 'Harbor View',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Hash Browns',
            amount: 1.9,
            cost: 5.70,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 08:32',
            location: 'Midtown Grille',
            wasteType: 'Glass',
            source: 'Inventory',
            item: 'Juice Bottles',
            amount: 1.2,
            cost: 3.60,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 08:20',
            location: 'Airport Terminal',
            wasteType: 'Food',
            source: 'Plate',
            item: 'Croissant',
            amount: 0.9,
            cost: 4.50,
            status: 'normal'
        },
        {
            datetime: '2026-02-08 08:08',
            location: 'University District',
            wasteType: 'Food',
            source: 'Prep',
            item: 'Muffins',
            amount: 1.7,
            cost: 8.90,
            status: 'normal'
        }
    ],

    // Food Waste Analytics Data
    foodWasteAnalytics: {
        // Ingredient-level tracking
        ingredientWaste: [
            { ingredient: 'Lettuce', waste_kg: 125.3, cost: 215, category: 'Vegetables', wasteRate: 28, trend: 'increasing' },
            { ingredient: 'Tomatoes', waste_kg: 98.7, cost: 185, category: 'Vegetables', wasteRate: 22, trend: 'stable' },
            { ingredient: 'Beef (ribeye)', waste_kg: 87.2, cost: 1245, category: 'Protein', wasteRate: 12, trend: 'decreasing' },
            { ingredient: 'Chicken breast', waste_kg: 76.5, cost: 420, category: 'Protein', wasteRate: 15, trend: 'stable' },
            { ingredient: 'Salmon', waste_kg: 68.9, cost: 895, category: 'Seafood', wasteRate: 18, trend: 'decreasing' },
            { ingredient: 'Pasta', waste_kg: 64.3, cost: 125, category: 'Carbs', wasteRate: 10, trend: 'stable' },
            { ingredient: 'Potatoes', waste_kg: 59.8, cost: 95, category: 'Vegetables', wasteRate: 20, trend: 'increasing' },
            { ingredient: 'Cheese', waste_kg: 52.4, cost: 385, category: 'Dairy', wasteRate: 16, trend: 'stable' },
            { ingredient: 'Bread', waste_kg: 48.6, cost: 145, category: 'Carbs', wasteRate: 25, trend: 'decreasing' },
            { ingredient: 'Onions', waste_kg: 45.2, cost: 68, category: 'Vegetables', wasteRate: 19, trend: 'stable' },
            { ingredient: 'Mushrooms', waste_kg: 42.1, cost: 195, category: 'Vegetables', wasteRate: 24, trend: 'increasing' },
            { ingredient: 'Bell peppers', waste_kg: 38.7, cost: 145, category: 'Vegetables', wasteRate: 21, trend: 'stable' }
        ],

        // Pre-consumer waste by stage
        preConsumerWaste: [
            { stage: 'Receiving', percentage: 8, kg: 102, description: 'Quality issues, damaged goods' },
            { stage: 'Storage', percentage: 12, kg: 154, description: 'Spoilage, expiration' },
            { stage: 'Prep', percentage: 35, kg: 449, description: 'Trimming, peeling, overcutting' },
            { stage: 'Cooking', percentage: 25, kg: 321, description: 'Overcooking, burning, testing' },
            { stage: 'Holding', percentage: 20, kg: 255, description: 'Overproduction, time limits' }
        ],

        // Plate waste analysis
        plateWasteAnalysis: [
            { dish: 'Ribeye Steak', avgWaste: 145, totalOrders: 312, wasteRate: 28, reason: 'Portion too large', savings: 580 },
            { dish: 'Caesar Salad', avgWaste: 95, totalOrders: 408, wasteRate: 35, reason: 'Dressing preference', savings: 290 },
            { dish: 'Pasta Carbonara', avgWaste: 88, totalOrders: 385, wasteRate: 22, reason: 'Portion size', savings: 245 },
            { dish: 'Grilled Salmon', avgWaste: 78, totalOrders: 285, wasteRate: 18, reason: 'Seasoning issues', savings: 380 },
            { dish: 'French Fries', avgWaste: 125, totalOrders: 542, wasteRate: 42, reason: 'Excessive serving', savings: 120 },
            { dish: 'Chicken Alfredo', avgWaste: 72, totalOrders: 298, wasteRate: 20, reason: 'Sauce quantity', savings: 210 },
            { dish: 'Margherita Pizza', avgWaste: 65, totalOrders: 445, wasteRate: 15, reason: 'Slice size', savings: 185 },
            { dish: 'Lobster Bisque', avgWaste: 58, totalOrders: 156, wasteRate: 25, reason: 'Richness', savings: 295 }
        ],

        // Portion optimization recommendations
        portionOptimization: [
            { 
                dish: 'Ribeye Steak',
                currentPortion: 340,
                recommendedPortion: 280,
                reduction: 18,
                monthlySavings: 1850,
                confidence: 92,
                customerSatisfaction: 4.3
            },
            { 
                dish: 'Caesar Salad',
                currentPortion: 285,
                recommendedPortion: 220,
                reduction: 23,
                monthlySavings: 1240,
                confidence: 88,
                customerSatisfaction: 4.5
            },
            { 
                dish: 'French Fries',
                currentPortion: 310,
                recommendedPortion: 225,
                reduction: 27,
                monthlySavings: 980,
                confidence: 95,
                customerSatisfaction: 4.4
            },
            { 
                dish: 'Pasta Carbonara',
                currentPortion: 420,
                recommendedPortion: 350,
                reduction: 17,
                monthlySavings: 1560,
                confidence: 90,
                customerSatisfaction: 4.6
            },
            { 
                dish: 'Grilled Salmon',
                currentPortion: 280,
                recommendedPortion: 240,
                reduction: 14,
                monthlySavings: 2180,
                confidence: 85,
                customerSatisfaction: 4.2
            }
        ],

        // Menu engineering matrix
        menuEngineering: [
            { 
                dish: 'Ribeye Steak',
                profitability: 'high',
                popularity: 'high',
                category: 'Star',
                wasteImpact: 'high',
                action: 'Optimize portion',
                priority: 'high'
            },
            { 
                dish: 'Pasta Carbonara',
                profitability: 'high',
                popularity: 'high',
                category: 'Star',
                wasteImpact: 'medium',
                action: 'Maintain',
                priority: 'medium'
            },
            { 
                dish: 'Caesar Salad',
                profitability: 'low',
                popularity: 'high',
                category: 'Plow Horse',
                wasteImpact: 'high',
                action: 'Reduce portion',
                priority: 'high'
            },
            { 
                dish: 'Grilled Salmon',
                profitability: 'high',
                popularity: 'medium',
                category: 'Puzzle',
                wasteImpact: 'medium',
                action: 'Promote',
                priority: 'medium'
            },
            { 
                dish: 'Lobster Bisque',
                profitability: 'high',
                popularity: 'low',
                category: 'Puzzle',
                wasteImpact: 'high',
                action: 'Reformulate',
                priority: 'high'
            },
            { 
                dish: 'French Fries',
                profitability: 'low',
                popularity: 'high',
                category: 'Plow Horse',
                wasteImpact: 'critical',
                action: 'Urgent reduction',
                priority: 'critical'
            },
            { 
                dish: 'Vegetable Stir Fry',
                profitability: 'medium',
                popularity: 'low',
                category: 'Dog',
                wasteImpact: 'low',
                action: 'Consider removal',
                priority: 'low'
            },
            { 
                dish: 'Chocolate Cake',
                profitability: 'high',
                popularity: 'medium',
                category: 'Puzzle',
                wasteImpact: 'low',
                action: 'Promote',
                priority: 'low'
            }
        ],

        // Waste by meal period
        wasteByMealPeriod: [
            { period: 'Breakfast', waste_kg: 245, cost: 1850, orders: 1240, wastePerOrder: 0.198 },
            { period: 'Lunch', waste_kg: 892, cost: 6780, orders: 3850, wastePerOrder: 0.232 },
            { period: 'Dinner', waste_kg: 1456, cost: 12450, orders: 4250, wastePerOrder: 0.343 },
            { period: 'Late Night', waste_kg: 254, cost: 1680, orders: 860, wastePerOrder: 0.295 }
        ],

        // Waste trends by day of week
        wasteByDayOfWeek: [
            { day: 'Monday', waste_kg: 385, cost: 2940, avgWasteRate: 18.5 },
            { day: 'Tuesday', waste_kg: 352, cost: 2680, avgWasteRate: 17.2 },
            { day: 'Wednesday', waste_kg: 368, cost: 2810, avgWasteRate: 17.8 },
            { day: 'Thursday', waste_kg: 398, cost: 3120, avgWasteRate: 19.2 },
            { day: 'Friday', waste_kg: 485, cost: 3890, avgWasteRate: 22.4 },
            { day: 'Saturday', waste_kg: 512, cost: 4180, avgWasteRate: 23.8 },
            { day: 'Sunday', waste_kg: 447, cost: 3640, avgWasteRate: 21.1 }
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dashboardData;
}

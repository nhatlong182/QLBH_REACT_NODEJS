import bcrypt from 'bcryptjs'

const data = {
    accounts: [
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            sex: 'male',
            avatar: '/images/avatar.jpg',
            isAdmin: true,
            isWebmaster: true,
        },
        {
            name: 'Long',
            email: 'Long@example.com',
            password: bcrypt.hashSync('1234', 8),
            sex: 'male',
            avatar: '/images/avt.jpg',
            isAdmin: false,
            isWebmaster: true,
        },
        {
            name: 'Phuc',
            email: 'Phuc@example.com',
            password: bcrypt.hashSync('1234', 8),
            sex: 'male',
            avatar: '/images/avatar.jpg',
            isAdmin: false,
            isWebmaster: false,
        },
    ],
    products: [
        {
            name: 'Áo Thun UT Animal Crossing Green',
            category: 'T-Shirts',
            image: '/images/aoutanimalxanh.jpg',
            price: 399000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 10,
            description: 'Animal Crossing New Horizons',
        },
        {
            name: 'Áo Thun UT Animal Crossing White',
            category: 'T-Shirts',
            image: '/images/aoutanimaltrang.jpg',
            price: 399000,
            countInStock: 25,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 10,
            description: 'Animal Crossing New Horizons',
        },
        {
            name: 'Áo Thun UT Animal Crossing Navy',
            category: 'T-Shirts',
            image: '/images/aoutanimalnavy.jpg',
            price: 399000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 5,
            numReviews: 17,
            description: 'Animal Crossing New Horizons',
        },
        {
            name: 'Áo Thun PEANUTS UT OLIVE',
            category: 'T-Shirts',
            image: '/images/aopeanutolive.jpg',
            price: 399000,
            countInStock: 19,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 14,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun PEANUTS SHORT BLACK',
            category: 'T-Shirts',
            image: '/images/aopeanutden.jpg',
            price: 399000,
            countInStock: 5,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 10,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun EANUTS UT BEIGE',
            category: 'T-Shirts',
            image: '/images/aoutpeanutbe.jpg',
            price: 399000,
            countInStock: 12,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 15,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun PEANUTS UT WHITE',
            category: 'T-Shirts',
            image: '/images/aopeanuttrang.jpg',
            price: 399000,
            countInStock: 8,
            brand: 'Uniqlo',
            rating: 5,
            numReviews: 12,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun UT Basquiat',
            category: 'T-Shirts',
            image: '/images/aobasquiatden.jpg',
            price: 349000,
            countInStock: 10,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 20,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun UT Andy Warhol',
            category: 'T-Shirts',
            image: '/images/aoutandyxam.jpg',
            price: 349000,
            countInStock: 30,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 5,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Thun UT The Brands',
            category: 'T-Shirts',
            image: '/images/aoutthebrandsden.jpg',
            price: 349000,
            countInStock: 16,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Áo Thun UT MARVEL Essentials',
            category: 'T-Shirts',
            image: '/images/aoutmarvel.jpg',
            price: 349000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 12,
            description: 'Thiết kế thuộc New Arrivals 08/2021',
        },
        {
            name: 'Áo Sơ Mi JW Anderson Caro vàng',
            category: 'Shirts',
            image: '/images/aosomicarongantayvang.jpg',
            price: 449000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 5,
            numReviews: 18,
            description: 'Áo sơ mi dáng rộng, thiết kế unisex',
        },
        {
            name: 'Áo Sơ Mi JW Anderson Caro trắng',
            category: 'Shirts',
            image: '/images/aosomicarongantaytrang.jpg',
            price: 449000,
            countInStock: 18,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 15,
            description: 'Áo có 2 túi hộp phía trước, cài khuy trước',
        },
        {
            name: 'Áo Polo AIRism FLY FRONT',
            category: 'T-Shirts',
            image: '/images/aopolosocgray.jpg',
            price: 449000,
            countInStock: 15,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 19,
            description: 'Áo polo cổ ve lật, tay ngắn bo viền bằng vải gân dệt cùng màu',
        },
        {
            name: 'Áo Polo AIRism FULL OPEN',
            category: 'T-Shirts',
            image: '/images/aopoloxanh.jpg',
            price: 449000,
            countInStock: 25,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 10,
            description: 'Áo polo cổ ve lật, tay ngắn, cài khuy phía trước',
        },
        {
            name: 'Áo OverSize CREW NECK',
            category: 'T-Shirts',
            image: '/images/aooversizenau.jpg',
            price: 399000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 16,
            description: 'Phom áo rộng, vai áo trễ. Bo áo dệt dày dặn không giãn',
        },
        {
            name: 'Áo Phông COLLEGE Xám',
            category: 'T-Shirts',
            image: '/images/aozarataydaixam.jpg',
            price: 729000,
            countInStock: 20,
            brand: 'Zara',
            rating: 4,
            numReviews: 12,
            description: 'Áo phông cổ tròn, tay lỡ.',
        },
        {
            name: 'Áo Phông COLLEGE Trắng',
            category: 'T-Shirts',
            image: '/images/aozarataydaitrang.jpg',
            price: 729000,
            countInStock: 25,
            brand: 'Zara',
            rating: 4,
            numReviews: 15,
            description: 'Áo phông cổ tròn, tay lỡ.',
        },
        {
            name: 'Áo Thun SLOGAN PRINT',
            category: 'T-Shirts',
            image: '/images/aozaranaunhat.jpg',
            price: 799000,
            countInStock: 20,
            brand: 'Zara',
            rating: 3,
            numReviews: 10,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'Áo Thun KNIT COLOUR BLOCK',
            category: 'T-Shirts',
            image: '/images/aozaratim.jpg',
            price: 799000,
            countInStock: 18,
            brand: 'Zara',
            rating: 4,
            numReviews: 15,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'Áo Thun PRINTED KNIT',
            category: 'T-Shirts',
            image: '/images/aozaraxam.jpg',
            price: 799000,
            countInStock: 25,
            brand: 'Zara',
            rating: 4,
            numReviews: 20,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'Áo Thun PRINTED PET SHOP',
            category: 'T-Shirts',
            image: '/images/aozaraxanhdatroi.jpg',
            price: 799000,
            countInStock: 20,
            brand: 'Zara',
            rating: 3,
            numReviews: 14,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'Áo Thun CASSETTE PRINT',
            category: 'T-Shirts',
            image: '/images/aozaratrang.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Zara',
            rating: 2,
            numReviews: 16,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'Áo Thun GRAPHIC PRINT',
            category: 'T-Shirts',
            image: '/images/aozaraden.jpg',
            price: 799000,
            countInStock: 15,
            brand: 'Zara',
            rating: 3,
            numReviews: 9,
            description: 'Áo phông dáng rộng cổ tròn, cộc tay',
        },
        {
            name: 'JW Anderson Quần Short Chino',
            category: 'Pants',
            image: '/images/quanshortchinoxam.jpg',
            price: 699000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 15,
            description: 'Quần lửng ống suông thẳng với túi xẻ hai bên và túi may viền phía sau',
        },
        {
            name: 'Quần Jeans Tech Denim Slim Fit',
            category: 'Pants',
            image: '/images/jeanslimfitnavy.jpg',
            price: 999000,
            countInStock: 18,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 15,
            description: 'high quality product',
        },
        {
            name: 'Quần Jean Ống Suông Regular Fit',
            category: 'Pants',
            image: '/images/jeanregularfitnavy.jpg',
            price: 999000,
            countInStock: 22,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 15,
            description: 'high quality product',
        },
        {
            name: 'Quần Jean Slim Fit',
            category: 'Pants',
            image: '/images/jeanslimfitnavy.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 15,
            description: 'high quality product',
        },
        {
            name: 'Quần Smart Pants Beige',
            category: 'Pants',
            image: '/images/quantaybeuniqlo.jpg',
            price: 799000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 5,
            numReviews: 18,
            description: 'Thiết kế thuộc New Arrivals 07/2021',
        },
        {
            name: 'Quần Smart Pants Đen',
            category: 'Pants',
            image: '/images/quantaydenuniqlo.jpg',
            price: 799000,
            countInStock: 15,
            brand: 'Uniqlo',
            rating: 4,
            numReviews: 15,
            description: 'Thiết kế thuộc New Arrivals 07/2021',
        },
        {
            name: 'Quần Smart Pants Xám',
            category: 'Pants',
            image: '/images/quantayxamuniqlo.jpg',
            price: 799000,
            countInStock: 10,
            brand: 'Uniqlo',
            rating: 5,
            numReviews: 19,
            description: 'Thiết kế thuộc New Arrivals 07/2021',
        },
        {
            name: 'Quần KANDO Navy',
            category: 'Pants',
            image: '/images/quankandonavy.jpg',
            price: 999000,
            countInStock: 25,
            brand: 'Uniqlo',
            rating: 1,
            numReviews: 15,
            description: 'Thiết kế thuộc New Arrivals 07/2021',
        },
        {
            name: 'Quần KANDO Xám',
            category: 'Pants',
            image: '/images/quankandoxam.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 10,
            description: 'Thiết kế thuộc New Arrivals 07/2021',
        },
        {
            name: 'Quần Short DRY-EX',
            category: 'Pants',
            image: '/images/quandryshortnavy.jpg',
            price: 499000,
            countInStock: 20,
            brand: 'Uniqlo',
            rating: 3,
            numReviews: 15,
            description: 'Quần có lưng thun co giãn (+7cm) với dây rút điều chỉnh',
        },
        {
            name: 'GRADATION JEANS',
            category: 'Pants',
            image: '/images/gradationjeanowst.jpg',
            price: 749000,
            countInStock: 20,
            brand: 'OWST',
            rating: 4,
            numReviews: 10,
            description: 'Chất liệu: JEANS, Color: BLUE',
        },
        {
            name: 'CURVE JEANS BLACK',
            category: 'Pants',
            image: '/images/curvejeanblackowst.jpg',
            price: 749000,
            countInStock: 20,
            brand: 'OWST',
            rating: 3,
            numReviews: 15,
            description: 'Chất liệu: JEANS, Color: BLACK',
        },
        {
            name: 'Quần JOGGER BLACK',
            category: 'Pants',
            image: '/images/quanjoggerowstblack.jpg',
            price: 390000,
            countInStock: 15,
            brand: 'OWST',
            rating: 5,
            numReviews: 10,
            description: 'Chất liệu: 100% COTTON, Color: BLACK',
        },
        {
            name: 'Quần JOGGER LIGHT GRAY',
            category: 'Pants',
            image: '/images/quanjoggerowstlightgray.jpg',
            price: 390000,
            countInStock: 18,
            brand: 'OWST',
            rating: 4,
            numReviews: 15,
            description: 'Chất liệu: 100% COTTON, Color: LIGHT GRAY',
        },
        {
            name: 'Quần JOGGER DARK GRAY',
            category: 'Pants',
            image: '/images/quanjoggerowstdarkgray.jpg',
            price: 390000,
            countInStock: 20,
            brand: 'OWST',
            rating: 5,
            numReviews: 17,
            description: 'Chất liệu: 100% COTTON, Color: DARK GRAY',
        },
        {
            name: 'Quần SWEATSHORT BLACK',
            category: 'Pants',
            image: '/images/shortowstblack.jpg',
            price: 350000,
            countInStock: 15,
            brand: 'OWST',
            rating: 4,
            numReviews: 12,
            description: 'Chất liệu: 100% COTTON, Color: BLACK',
        },
        {
            name: 'Quần SWEATSHORT NAVY',
            category: 'Pants',
            image: '/images/shortowstnavy.jpg',
            price: 350000,
            countInStock: 18,
            brand: 'OWST',
            rating: 3,
            numReviews: 10,
            description: 'Chất liệu: 100% COTTON, Color: NAVY',
        },
        {
            name: 'Quần BASIC SWEATSHORT GRAY',
            category: 'Pants',
            image: '/images/shortowstgray.jpg',
            price: 350000,
            countInStock: 15,
            brand: 'OWST',
            rating: 4,
            numReviews: 13,
            description: 'Chất liệu: 100% COTTON, Color: GRAY',
        },
        {
            name: 'Quần PATTERN LACVIET',
            category: 'Pants',
            image: '/images/quanlacvietowst.jpg',
            price: 590000,
            countInStock: 20,
            brand: 'OWST',
            rating: 3,
            numReviews: 16,
            description: 'Chất liệu: KAKI. Thiết kế thuộc BST LACVIET Summer 2021.',
        },
        {
            name: 'Quần TAPO Shorts BLACK',
            category: 'Pants',
            image: '/images/quanshortliderden.jpg',
            price: 620000,
            countInStock: 20,
            brand: 'LIDER',
            rating: 4,
            numReviews: 16,
            description: 'Quần lửng bermuda ống suông thẳng, đường may cạnh sườn có chi tiết may ngược trang trí.',
        },
        {
            name: 'Quần TAPO Shorts WHITE',
            category: 'Pants',
            image: '/images/quanshortlidertrang.jpg',
            price: 620000,
            countInStock: 15,
            brand: 'LIDER',
            rating: 4,
            numReviews: 12,
            description: 'Quần lửng bermuda ống suông thẳng, đường may cạnh sườn có chi tiết may ngược trang trí.',
        },
        {
            name: 'UNCLE Jeans',
            category: 'Pants',
            image: '/images/unclejeanlider.jpg',
            price: 790000,
            countInStock: 20,
            brand: 'LIDER',
            rating: 3,
            numReviews: 14,
            description: 'Thiết kế thuộc dòng sản phẩm classic của LIDER',
        },
        {
            name: 'TOM Jeans',
            category: 'Pants',
            image: '/images/tomjeanlider.jpg',
            price: 820000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 2,
            numReviews: 14,
            description: 'Thiết kế thuộc dòng sản phẩm classic của LIDER',
        },
        {
            name: 'Quần ORI Black',
            category: 'Pants',
            image: '/images/quanoridenlider.jpg',
            price: 720000,
            countInStock: 16,
            brand: 'LIDER',
            rating: 4,
            numReviews: 10,
            description: 'Thiết kế thuộc dòng sản phẩm classic của LIDER',
        },
        {
            name: 'Quần ORI White',
            category: 'Pants',
            image: '/images/quanoritranglider.jpg',
            price: 720000,
            countInStock: 20,
            brand: 'LIDER',
            rating: 4,
            numReviews: 12,
            description: 'Thiết kế thuộc dòng sản phẩm classic của LIDER',
        },
        {
            name: 'Quần CARGO CEMENT',
            category: 'Pants',
            image: '/images/quancargolider.jpg',
            price: 580000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 5,
            numReviews: 15,
            description: 'Quần ống suông rộng phom unisex với độ dài phủ gót. Quần có 2 túi hộp có nắp.',
        },
        {
            name: 'Quần DEEP SEA',
            category: 'Pants',
            image: '/images/quandeepsealider.jpg',
            price: 750000,
            countInStock: 20,
            brand: 'LIDER',
            rating: 4,
            numReviews: 13,
            description: 'Quần ống rộng xếp li giữa với túi hai bên, lưng thun co giãn (+10cm) phía sau.',
        },
        {
            name: 'Áo Khoác SIVINA Black',
            category: 'Jacket',
            image: '/images/aokhoacsivinablack.jpg',
            price: 890000,
            countInStock: 20,
            brand: 'LIDER',
            rating: 4,
            numReviews: 10,
            description: 'Áo khoác phom rộng có nón, tay áo bo chun. Thiết kế unisex.',
        },
        {
            name: 'Áo Khoác SIVINA Pink',
            category: 'Jacket',
            image: '/images/aokhoacsivinapink.jpg',
            price: 890000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 3,
            numReviews: 15,
            description: 'Áo khoác phom rộng có nón, tay áo bo chun. Thiết kế unisex.',
        },
        {
            name: 'Áo Khoác SUNSET',
            category: 'Jacket',
            image: '/images/aokhoacsunset.jpg',
            price: 720000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 3,
            numReviews: 15,
            description: 'Áo khoác cổ cao có mũ trùm đầu kèm dây rút, có túi đắp phía trước.',
        },
        {
            name: 'Áo Blazer COMTE',
            category: 'Blazer',
            image: '/images/aocometblazer.jpg',
            price: 850000,
            countInStock: 30,
            brand: 'LIDER',
            rating: 3,
            numReviews: 15,
            description: 'Áo khoác blazer phom rộng lửng, ve áo lật.',
        },
        {
            name: 'Áo Blazer GREYLINE',
            category: 'Blazer',
            image: '/images/aogreylineblazer.jpg',
            price: 990000,
            countInStock: 30,
            brand: 'LIDER',
            rating: 4,
            numReviews: 10,
            description: 'Áo khoác blazer phom rộng lửng, ve áo lật.',
        },
        {
            name: 'Áo Khoác BLUEBERRY',
            category: 'Jacket',
            image: '/images/aokhoacblueberry.jpg',
            price: 820000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 2,
            numReviews: 15,
            description: 'Áo khoác phom ngắn, ve áo lật, nút gài giữa áo.',
        },
        {
            name: 'Áo Khoác COOKIE',
            category: 'Jacket',
            image: '/images/aocookiecoat.jpg',
            price: 999000,
            countInStock: 25,
            brand: 'LIDER',
            rating: 3,
            numReviews: 15,
            description: 'Áo khoác dáng trench coat kèm dây thắt rời, cổ áo đôi.',
        },
        {
            name: 'Áo Khoác GINGHAM',
            category: 'Jacket',
            image: '/images/aokhoacgingham.jpg',
            price: 590000,
            countInStock: 20,
            brand: 'OWST',
            rating: 1,
            numReviews: 15,
            description: 'Chất liệu: COTTON. Có túi hộp phía trước, khuy cài trước',
        },
        {
            name: 'Áo Khoác LOGO Gray',
            category: 'Jacket',
            image: '/images/aokhoaclogoowstgray.jpg',
            price: 599000,
            countInStock: 25,
            brand: 'OWST',
            rating: 3,
            numReviews: 10,
            description: 'Chất liệu: COTTON, Color: GRAY',
        },
        {
            name: 'Áo Khoác LOGO Black',
            category: 'Jacket',
            image: '/images/aokhoaclogoowstden.jpg',
            price: 599000,
            countInStock: 25,
            brand: 'OWST',
            rating: 4,
            numReviews: 17,
            description: 'Chất liệu: COTTON, Color: BLACK',
        },
        {
            name: 'Áo Khoác LACVIET',
            category: 'Jacket',
            image: '/images/aokhoaclacviet.jpg',
            price: 650000,
            countInStock: 25,
            brand: 'OWST',
            rating: 3,
            numReviews: 12,
            description: 'Chất liệu: COTTON, Color: BLACK. Thiết kế thuộc BST LACVIET Summer 2021.',
        },
        {
            name: 'Áo Khoác GARNITURE',
            category: 'Jacket',
            image: '/images/aokhoacgarnitureblack.jpg',
            price: 750000,
            countInStock: 30,
            brand: 'OWST',
            rating: 4,
            numReviews: 20,
            description: 'Áo khoác da dáng bomber, cổ ve lật, lai áo bo chun.',
        },
        {
            name: 'Áo Hoodie Washed Cream',
            category: 'Hoodie',
            image: '/images/0912hoodiewashedbe.jpg',
            price: 629000,
            countInStock: 30,
            brand: '0912',
            rating: 4,
            numReviews: 20,
            description: 'Vintage Washed, Chất liệu: 100% French Terry Cotton',
        },
        {
            name: 'Áo Hoodie Washed Black',
            category: 'Hoodie',
            image: '/images/0912hoodiewashedblack.jpg',
            price: 629000,
            countInStock: 0,
            brand: '0912',
            rating: 5,
            numReviews: 25,
            description: 'Vintage Washed, Chất liệu: 100% French Terry Cotton',
        },
        {
            name: 'Áo Hoodie Washed Logo',
            category: 'Hoodie',
            image: '/images/0912logohoodiewashed.jpg',
            price: 629000,
            countInStock: 0,
            brand: '0912',
            rating: 5,
            numReviews: 30,
            description: 'Vintage Washed, Chất liệu: 100% French Terry Cotton',
        },
        {
            name: 'Áo Cardigan Jumper',
            category: 'Cardigan',
            image: '/images/aogcadigangucciwool.jpg',
            price: 999000,
            countInStock: 15,
            brand: 'Gucci',
            rating: 3,
            numReviews: 10,
            description: 'Dark blue Square G wool intarsia, 100% Wool',
        },
        {
            name: 'Áo Khoác Da Vintage',
            category: 'Jacket',
            image: '/images/aokhoacdavintageysl.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Saint Laurent',
            rating: 2,
            numReviews: 14,
            description: '100% Cowhide Leather. Khuy cài phía trước',
        },
        {
            name: 'Áo Khoác Da Bomber',
            category: 'Jacket',
            image: '/images/aokhoacbomberysl.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Saint Laurent',
            rating: 4,
            numReviews: 10,
            description: '100% Sheep. Dây kéo phía trước,',
        },
        {
            name: 'Áo Khoác Da Shearling',
            category: 'Jacket',
            image: '/images/aokhoacdaysl.jpg',
            price: 999000,
            countInStock: 0,
            brand: 'Saint Laurent',
            rating: 5,
            numReviews: 20,
            description: '100% CALFSKIN LEATHER. 2 túi hộp, khuy cài phía trước',
        },
        {
            name: 'Áo Khoác Dirty Denim Shearling',
            category: 'Jacket',
            image: '/images/aokhoacdenimdirtyysl.jpg',
            price: 900000,
            countInStock: 20,
            brand: 'Saint Laurent',
            rating: 4,
            numReviews: 10,
            description: 'Chất liệu: 50% COTTON 50% LAMBSKIN. 2 túi hộp, khuy cài phía trước',
        },
        {
            name: 'Áo Khoác Teddy In Wool',
            category: 'Jacket',
            image: '/images/aoteddyinwoolysl.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Saint Laurent',
            rating: 5,
            numReviews: 19,
            description: 'Chất liệu: 90% WOOL, 10% POLYAMIDE, khuy cài phía trước',
        },
        {
            name: 'Áo Khoác Denim DNA',
            category: 'Jacket',
            image: '/images/aokhoacdnadenim.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Louis Vuitton',
            rating: 3,
            numReviews: 10,
            description: 'Chiếc áo khoác DNA Denim này mang đến sự biến tấu của Virgil Abloh cho một hình bóng cổ điển.',
        },
        {
            name: 'Áo Khoác Gabardine',
            category: 'Jacket',
            image: '/images/aoparkatysl.jpg',
            price: 999000,
            countInStock: 20,
            brand: 'Sain Laurent',
            rating: 4,
            numReviews: 15,
            description: 'Chất liệu: 77% COTTON, 23% RAMIE. Hai túi xéo chìm mặt trước.',
        },
        {
            name: 'Áo Khoác Monogram Bomber',
            category: 'Jacket',
            image: '/images/aokhoacmonogramlv.jpg',
            price: 900000,
            countInStock: 0,
            brand: 'Sain Laurent',
            rating: 5,
            numReviews: 25,
            description: 'Các chi tiết bao gồm chữ ký LV màu nước trên tay áo và các đường gân dệt kim.',
        },
    ],

};
export default data;
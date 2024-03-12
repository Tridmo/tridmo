export const sampleUser = {
    id: 'id',
    name: 'Mamatqul Masharipov',
    rank: 100,
    username: 'mamatqul_dizayn',
    image_src: '/img/profile.png',
    email: 'mamatqul@gmail.com',
    phone_number: '998990001122',
    telegram: '@mamatqul',
    portfolio_link: 'https://brand.com',
    created_at: new Date().toDateString(),

}

export const sampleBrand = {
    id: 'id',
    name: 'Brand name',
    description: '️ 3ds Max (Vray, Corona) yoki Revit uchun ️ BIM modellari uchun Natuzzi professional 3D modellari. Natuzzi (Italiya) ️ Revit / BIM oilalari modellari uchun kutubxona. Buyuk Katalogda professional modellarni soting yoki sotib oling.',
    logo: '/img/brand-img.jpg',
    style: 'Modern',
    email: 'brand@brand.com',
    site_link: 'https://brand.com',
    phone_number: '998990001122',
    location: {
        name: 'Tashkent',
        lat: '',
        long: ''
    }
}

export const sampleInterior = {
    id: `id`,
    brand_id: `brand_id`,
    category_id: `category_id`,
    model_platform_id: `model_platform_id`,
    render_platform_id: `render_platform_id`,
    interaction_id: `interaction_id`,
    file_id: `file_id`,
    style_id: `style_id`,
    name: `Interior name`,
    description: `Ushbu mahsulot “NATUZZI” tomonidan ishlab chiqarilgan bo’lib 3D modelining o’lchami va ranglari asl mahsulot bilan bir xil yasalgan. Diqqat: vaqt o’tib mahsulot sotuvda qolmasligi yoki narxi o’zgarishi mumkin.`,
    slug: `slug`,
    furniture_cost: `7000000`,
    availability: `availability`,
    width: `400`,
    height: `200`,
    length: `50`,
    is_deleted: `is_deleted`,
    created_at: `${new Date()}`,
    user: sampleUser,
    file: {
        size: 5000000
    },
    model_platform: {
        name: '3ds Max 2018'
    },
    render_platform: {
        name: 'Corona | OBJ'
    },
    style: {
        name: 'Modern'
    },
    colors: [
        {
            color: { hex_value: '#040404' }
        }
    ],
    materials: [
        {
            material: { name: 'Teri' }
        }
    ],
    cover: [{ image: { src: '/img/interior1.jpg' } }],

    images: [{
        image: { src: `/img/interior1.jpg` }
    }, {
        image: { src: `/img/interior2.jpg` }
    }, {
        image: { src: `/img/interior3.jpg` }
    }
    ]

}

export const sampleModel = {
    id: `id`,
    top: true,
    brand_id: `brand_id`,
    category_id: `category_id`,
    model_platform_id: `model_platform_id`,
    render_platform_id: `render_platform_id`,
    interaction_id: `interaction_id`,
    file_id: `file_id`,
    style_id: `style_id`,
    name: `Model name`,
    description: `Ushbu mahsulot “NATUZZI” tomonidan ishlab chiqarilgan bo’lib 3D modelining o’lchami va ranglari asl mahsulot bilan bir xil yasalgan. Diqqat: vaqt o’tib mahsulot sotuvda qolmasligi yoki narxi o’zgarishi mumkin.`,
    slug: `slug`,
    furniture_cost: `7000000`,
    availability: `availability`,
    width: `400`,
    height: `200`,
    length: `50`,
    is_deleted: `is_deleted`,
    created_at: `${new Date()}`,
    used_interiors: Array.from({ length: 4 }, () => sampleInterior),
    file: {
        size: 5000000
    },
    brand: sampleBrand,
    model_platform: {
        name: '3ds Max 2018'
    },
    render_platform: {
        name: 'Corona | OBJ'
    },
    style: {
        name: 'Modern'
    },
    colors: [
        {
            color: { hex_value: '#040404' }
        }
    ],
    materials: [
        {
            material: { name: 'Teri' }
        }
    ],
    cover: [{ image: { src: '/img/models1.jpg' } }],

    images: [{
        image: { src: `/img/interior1.jpg` }
    }, {
        image: { src: `/img/interior2.jpg` }
    }, {
        image: { src: `/img/interior3.jpg` }
    }
    ]
}
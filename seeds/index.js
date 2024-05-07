const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

main().then(() => {
    console.log('database connected')
})
.catch(err => console.log(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor( Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '662fb1319364a770190f2173',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae pariatur consectetur accusantium vero quisquam aspernatur magni est iste debitis quia soluta, obcaecati laudantium modi?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dbftnil9r/image/upload/v1714737396/yelpcamp/kixzqynnd9eyhhrgb5qw.jpg',
                  filename: 'yelpcamp/kixzqynnd9eyhhrgb5qw',
                },
                {
                  url: 'https://res.cloudinary.com/dbftnil9r/image/upload/v1714737397/yelpcamp/pj07k57zssuw0ebkrrbd.jpg',
                  filename: 'yelpcamp/pj07k57zssuw0ebkrrbd',
                }
              ]
            
        })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

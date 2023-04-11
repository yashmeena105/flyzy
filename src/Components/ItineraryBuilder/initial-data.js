const initialData = {
  dayComponents: {
    '9823981': {
      _id: '9823981',
      type: "FLIGHT",
      name: 'Flight from Delhi to Dubai', time_as_text: "4 hrs", flight_search_params: {
        from: {
          iata_code: null,
          airport_name: "Delhi - India",
        },
        to: {
          iata_code: null,
          airport_name: "Dubai - United Arab Emirates",
        },
        departure_date_utc: null,
        lead_pax_name: null,
        pax: {
          adult: 50,
          child: 0,
          infant: 0,
        },
      },
      notes: [
        {
          note: "Just give me the cheapest flight",
        },
      ],
    },
    '9823982': {
      _id: "9823982",
      type: "STAY",

      checkin_or_checkout: "Check-In",
      time_as_text: "Afternoon",
      items_selected: [],
      notes: "",
      master_component: {
        _id: 190102,
        name: "XYZ Hotel",
        description: "Kickass Hotel outside Dubai",
        stars: 4,
        external_ratings: "",
        destination: {
          formatted_address: "Dubai - United Arab Emirates",
          location: {
            lat: 25.2048493,
            lng: 55.2707828,
          },
          city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
          types: ["locality", "political"],
        },
        images: [
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://thumbs.dreamstime.com/z/hotel-room-apartment-doorway-key-keyring-key-fob-open-door-bedroom-background-40522012.jpg",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url: "https://thumbs.dreamstime.com/z/door-handles-19035557.jpg",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
        ],
        name: "XYZ Hotel",
        package_text: "",
        capacity: "",
        address: "",
        type: "HOTEL",
        is_active: true,
      },
    },
    '9823983': {
      _id: '9823983',
      type: "ACTIVITY",
      activity_name: "Desert Safari",
      description: "Best Experience in Dubai",
      master_component: {
        name: "Desert Safari",
        type: "DINING"
      },
      images: [
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://thumbs.dreamstime.com/z/hotel-room-apartment-doorway-key-keyring-key-fob-open-door-bedroom-background-40522012.jpg",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url: "https://thumbs.dreamstime.com/z/door-handles-19035557.jpg",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
      ],
      type: "HIKING/TREKKING",
      is_active: true,
    },
    '9823984': {
      _id: '9823984',
      type: "ACTIVITY",
      activity_name: "ABC Camps",
      description: "Kickass Camping outside Dubai",
      images: [
        {
          name: "SS.png",
          url:
            "https://thumbs.dreamstime.com/z/hotel-room-apartment-doorway-key-keyring-key-fob-open-door-bedroom-background-40522012.jpg",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url: "https://thumbs.dreamstime.com/z/door-handles-19035557.jpg",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
        {
          name: "SS.png",
          url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          size: "10 kb",
          type: "PNG",
        },
      ],
      type: "ADVENTURE",
      is_active: true,
    },
    '9823985': {
      _id: "9823985",
      type: "STAY",
      master_component_id: 190102,
      checkin_or_checkout: "Check-Out",
      time_as_text: "Early Morning",
      items_selected: [],
      notes: "",
      master_component: {
        _id: "190102",
        name: "XYZ Hotel",
        description: "Kickass Hotel outside Dubai",
        // stars: 4,
        external_ratings: "",
        destination: {
          formatted_address: "Dubai - United Arab Emirates",
          location: {
            lat: 25.2048493,
            lng: 55.2707828,
          },
          city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
          types: ["locality", "political"],
        },
        images: [
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://thumbs.dreamstime.com/z/hotel-room-apartment-doorway-key-keyring-key-fob-open-door-bedroom-background-40522012.jpg",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url: "https://thumbs.dreamstime.com/z/door-handles-19035557.jpg",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
          {
            name: "SS.png",
            url:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            size: "10 kb",
            type: "PNG",
          },
        ],
        name: "XYZ Hotel",
        capacity: "",
        address: "",
        type: "HOTEL",
        is_active: true,
      },
    },
    '9823986': {
      _id: "9823986",
      type: "TRANSFER",
      name: "Private Cab Transfer",
      time_as_text: "15 minutes",
      is_private_transfer: true,
      start_location: {
        text: "XYZ Hotel",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      end_location: {
        text: "Desert Safari",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      notes: "",
    },

    '9823987': {
      _id: "9823987",
      type: "TRANSFER",
      name: "Airport Transfer",
      time_as_text: "24 minutes",
      is_private_transfer: true,
      start_location: {
        text: "XYZ Hotel",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      end_location: {
        text: "Dubai Airport",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      notes: "",
    },
    '9823988': {
      _id: "9823988",
      type: "TRANSFER",
      name: "Private Cab Transfer",
      time_as_text: "15 minutes",
      is_private_transfer: true,
      start_location: {
        text: "ABC Camps",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      end_location: {
        text: "XYZ Hotel",
        formatted_address: "Dubai - United Arab Emirates",
        location: {
          lat: 25.2048493,
          lng: 55.2707828,
        },
        city_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
        types: ["locality", "political"],
      },
      notes: "",
    },
  },
  days: {
    'aa': {
      _id: 'aa',
      title: 'kajdhkjadh',
      componentIds: ['9823981', '9823986', '9823982',],
    },
    'bb': {
      _id: 'bb',
      title: 'uewijxlsll',
      componentIds: ['9823983', '9823984', '9823988',],
    },
    'cc': {
      _id: 'cc',
      title: 'djkahkjoio',
      componentIds: ['9823985', '9823987',],
    },
    'dd': {
      _id: 'dd',
      title: 'doajomlkmi',
      componentIds: [],
    },
    'ee': {
      _id: 'ee',
      title: 'joijoijoij',
      componentIds: [],
    },
    'ff': {
      _id: 'ff',
      title: 'ncmsjkxzki',
      componentIds: [],
    },
  },
  // Facilitate reordering of the columns
  dayOrder: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff'],
};

export default initialData;

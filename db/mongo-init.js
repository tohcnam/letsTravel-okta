db.auth('admin', 'Password123')

db = db.getSiblingDB('travel');

db.createUser({
  user: 'admin',
  pwd: 'Password123',
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ],
  mechanisms:[ "SCRAM-SHA-1"] 
});

db.createUser({
  user: 'travel',
  pwd: 'Password123',
  roles: [
    {
      role: 'dbOwner',
      db: 'travel',
    },
  ],
  mechanisms:[ "SCRAM-SHA-1"] 
});

db.createCollection("posts");
db.posts.insert(
  [{
    "id": "kktl34we",
    "title": "Big Ben",
    "date": "2020-06-29T13:33:37.231+00:00",
    "description": "Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower. The off ...",
    "text": "Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower. The official name of the tower in which Big Ben is located was originally the Clock Tower; it was renamed Elizabeth Tower in 2012 to mark the Diamond Jubilee of Elizabeth II, Queen of the United Kingdom.\n\nThe tower was designed by Augustus Pugin in a neo-Gothic style. When completed in 1859, its clock was the largest and most accurate four-faced striking and chiming clock in the world. The tower stands 315 feet (96 m) tall, and the climb from ground level to the belfry is 334 steps. Its base is square, measuring 39 feet (12 m) on each side. Dials of the clock are 23 feet (7.0 m) in diameter. On 31 May 2009, celebrations were held to mark the tower's 150th anniversary.\n\nBig Ben is the largest of the tower's five bells and weighs 13.5 long tons (13.7 tonnes; 15.1 short tons). It was the largest bell in the United Kingdom for 23 years. The origin of the bell's nickname is open to question; it may be named after Sir Benjamin Hall, who oversaw its installation, or heavyweight boxing champion Benjamin Caunt. Four quarter bells chime at 15, 30 and 45 minutes past the hour and just before Big Ben tolls on the hour. The clock uses its original Victorian mechanism, but an electric motor can be used as a backup.\n\nThe tower is a British cultural icon recognised all over the world. It is one of the most prominent symbols of the United Kingdom and parliamentary democracy, and it is often used in the establishing shot of films set in London. The clock tower has been part of a Grade I listed building since 1970 and a UNESCO World Heritage Site since 1987.\n\nOn 21 August 2017, a four-year schedule of renovation works began on the tower, which are to include the addition of a lift. There are also plans to re-glaze and repaint the clock dials. With a few exceptions, such as New Year's Eve and Remembrance Sunday, the bells are to be silent until the work is completed in 2021.",
    "country": "UK",
    "imageURL": "/images/big-ben.webp"
  },{
    "id": "aldskf3",
    "title": "Statue of Liberty",
    "date": "2020-06-29T13:34:31.995+00:00",
    "description": "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States. The copper statue, a gift from the people of France to the p ...",
    "text": "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel. The statue was dedicated on October 28, 1886.\n\nThe statue is a figure of Libertas, a robed Roman liberty goddess. She holds a torch above her head with her right hand, and in her left hand carries a tabula ansata inscribed JULY IV MDCCLXXVI (July 4, 1776 in Roman numerals), the date of the U.S. Declaration of Independence. A broken shackle and chain lie at her feet as she walks forward, commemorating the recent national abolition of slavery.[8] After its dedication, the statue became an icon of freedom and of the United States, seen as a symbol of welcome to immigrants arriving by sea.\n\nBartholdi was inspired by a French law professor and politician, Édouard René de Laboulaye, who is said to have commented in 1865 that any monument raised to U.S. independence would properly be a joint project of the French and U.S. peoples. The Franco-Prussian War delayed progress until 1875, when Laboulaye proposed that the French finance the statue and the U.S. provide the site and build the pedestal. Bartholdi completed the head and the torch-bearing arm before the statue was fully designed, and these pieces were exhibited for publicity at international expositions.\n\nThe torch-bearing arm was displayed at the Centennial Exposition in Philadelphia in 1876, and in Madison Square Park in Manhattan from 1876 to 1882. Fundraising proved difficult, especially for the Americans, and by 1885 work on the pedestal was threatened by lack of funds. Publisher Joseph Pulitzer, of the New York World, started a drive for donations to finish the project and attracted more than 120,000 contributors, most of whom gave less than a dollar. The statue was built in France, shipped overseas in crates, and assembled on the completed pedestal on what was then called Bedloe's Island. The statue's completion was marked by New York's first ticker-tape parade and a dedication ceremony presided over by President Grover Cleveland.\n\nThe statue was administered by the United States Lighthouse Board until 1901 and then by the Department of War; since 1933 it has been maintained by the National Park Service as part of the Statue of Liberty National Monument, and is a major tourist attraction. Public access to the balcony around the torch has been barred since 1916.",
    "country": "USA",
    "imageURL": "/images/statue-of-liberty.webp"
  },{
    "id": "8d0rgosjdkc24jqs5",
    "title": "Sydney Opera House",
    "date": "2020-06-30T16:07:21.940+00:00",
    "description": "The Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings.\n\nDesigned ...",
    "text": "The Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings.\n\nDesigned by Danish architect Jørn Utzon, but completed by an Australian architectural team headed up by Peter Hall, the building was formally opened on 20 October 1973 after a gestation beginning with Utzon's 1957 selection as winner of an international design competition. The Government of New South Wales, led by the premier, Joseph Cahill, authorised work to begin in 1958 with Utzon directing construction. The government's decision to build Utzon's design is often overshadowed by circumstances that followed, including cost and scheduling overruns as well as the architect's ultimate resignation.\n\nThe building and its surrounds occupy the whole of Bennelong Point on Sydney Harbour, between Sydney Cove and Farm Cove, adjacent to the Sydney central business district and the Royal Botanic Gardens, and close by the Sydney Harbour Bridge.\n\nThe building comprises multiple performance venues, which together host well over 1,500 performances annually, attended by more than 1.2 million people. Performances are presented by numerous performing artists, including three resident companies: Opera Australia, the Sydney Theatre Company and the Sydney Symphony Orchestra. As one of the most popular visitor attractions in Australia, the site is visited by more than eight million people annually, and approximately 350,000 visitors take a guided tour of the building each year. The building is managed by the Sydney Opera House Trust, an agency of the New South Wales State Government.\n\nOn 28 June 2007, the Sydney Opera House became a UNESCO World Heritage Site, having been listed on the (now defunct) Register of the National Estate since 1980, the National Trust of Australia register since 1983, the City of Sydney Heritage Inventory since 2000, the New South Wales State Heritage Register since 2003, and the Australian National Heritage List since 2005. Furthermore, the Opera House was a finalist in the New7Wonders of the World campaign list.",
    "country": "Australia",
    "imageURL": "/images/Sydneq-Opera-House.webp"
  },{
    "id": "8d0rgo5z5kcdbgcsr",
    "title": "Stonehenge",
    "date": "2020-07-08T12:06:09.099+00:00",
    "description": "Stonehenge is a prehistoric monument in Wiltshire, England, two miles (3 km) west of Amesbury. It consists of a ring of standing stones, each around 13 feet (4.0 m) high, seven feet (2.1 m) wide, and  ...",
    "text": "Stonehenge is a prehistoric monument in Wiltshire, England, two miles (3 km) west of Amesbury. It consists of a ring of standing stones, each around 13 feet (4.0 m) high, seven feet (2.1 m) wide, and weighing around 25 tons. The stones are set within earthworks in the middle of the most dense complex of Neolithic and Bronze Age monuments in England, including several hundred tumuli (burial mounds).\n\nArchaeologists believe it was constructed from 3000 BC to 2000 BC. The surrounding circular earth bank and ditch, which constitute the earliest phase of the monument, have been dated to about 3100 BC. Radiocarbon dating suggests that the first bluestones were raised between 2400 and 2200 BC, although they may have been at the site as early as 3000 BC.\n\nOne of the most famous landmarks in the United Kingdom, Stonehenge is regarded as a British cultural icon. It has been a legally protected Scheduled Ancient Monument since 1882, when legislation to protect historic monuments was first successfully introduced in Britain. The site and its surroundings were added to UNESCO's list of World Heritage Sites in 1986. Stonehenge is owned by the Crown and managed by English Heritage; the surrounding land is owned by the National Trust.\n\nStonehenge could have been a burial ground from its earliest beginnings. Deposits containing human bone date from as early as 3000 BC, when the ditch and bank were first dug, and continued for at least another 500 years.",
    "country": "UK",
    "imageURL": "/images/stonehenge.jpg"
  },{
    "id": "8d0rgo5z5kcdboexn",
    "title": "Brandenburg Gate",
    "date": "2020-07-08T12:12:25.115+00:00",
    "description": "The Brandenburg Gate (German: Brandenburger Tor) is an 18th-century neoclassical monument in Berlin, built on the orders of Prussian king Frederick William II after the temporary restoration of order  ...",
    "text": "The Brandenburg Gate (German: Brandenburger Tor) is an 18th-century neoclassical monument in Berlin, built on the orders of Prussian king Frederick William II after the temporary restoration of order during the Batavian Revolution. One of the best-known landmarks of Germany, it was built on the site of a former city gate that marked the start of the road from Berlin to the town of Brandenburg an der Havel, which used to be capital of the Margraviate of Brandenburg.\n\nIt is located in the western part of the city centre of Berlin within Mitte, at the junction of Unter den Linden and Ebertstraße, immediately west of the Pariser Platz. One block to the north stands the Reichstag building, which houses the German parliament (Bundestag). The gate is the monumental entry to Unter den Linden, a boulevard of linden trees which led directly to the royal City Palace of the Prussian monarchs.\n\nThroughout its existence, the Brandenburg Gate was often a site for major historical events and is today considered not only as a symbol of the tumultuous history of Europe and Germany, but also of European unity and peace.",
    "country": "Germany",
    "imageURL": "/images/brandenburg-gate.webp"
  },{
    "id": "8d0rgo5z5kcdbrd6j",
    "title": "Taj Mahal",
    "date": "2020-07-08T12:14:42.811+00:00",
    "description": "The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan (reigned from 1628 to ...",
    "text": "The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan (reigned from 1628 to 1658) to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centrepiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.\n\nConstruction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees, which in 2020 would be approximately 70 billion rupees (about U.S. $916 million). The construction project employed some 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahauri.\n\nThe Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being \"the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage\". It is regarded by many as the best example of Mughal architecture and a symbol of India's rich history. The Taj Mahal attracts 7–8 million visitors a year and in 2007, it was declared a winner of the New 7 Wonders of the World (2000–2007) initiative.",
    "country": "India",
    "imageURL": "/images/taj-mahal.jpg"
  }]
  );

  db.createCollection("emails");
  db.emails.insert(
    [{
      "id": "8d0rgo5z5kcdb739l",
      "email": "deana@troi.com",
      "name": "Deana Troi",
      "message": "I am interested in a travel to Betazed. Do you have something for this? ",
      "date": "2020-07-08T11:58:56.840Z"
    },{
      "id": "8d0rgo5z5kcdb97er",
      "email": "tuvok@fleet.com",
      "name": "Tuvok",
      "message": "Anything new with traveling to Vulcan? ",
      "date": "2020-07-08T12:00:35.523Z"
    },{
      "id": "8d0rgo5z5kcdbdq1o",
      "email": "donatra@romulus.com",
      "name": "Donatra",
      "message": "Did you know, Stonehenge was done by us? ",
      "date": "2020-07-08T12:04:06.300Z"
    }]
  );
  db.createCollection("callback-requests");
  db["callback-requests"].insert(
    [{
      "id": "8d0rgo5z5kcdb7eft",
      "phoneNumber": "+123456789",
      "date": "2020-07-08T11:59:11.321Z"
    },{
      "id": "8d0rgo5z5kcdb7k1h",
      "phoneNumber": "+987654321",
      "date": "2020-07-08T11:59:18.581Z"
    }]
  );
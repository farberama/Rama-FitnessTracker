export interface CompExercise {
  code: string;
  type: string;
  mets: string | number;
  category?: string;
}

export interface Compendium {
  category: string;
  exercises: CompExercise[];
}

export const compendium: Compendium[] = [
  {
    category: 'Rest',
    exercises: [
      {
        code: '1',
        mets: '1.3',
        type: 'standard rest'
      },
      {
        code: '2',
        mets: '3.4',
        type: 'active rest (boxer shuffle, marching in place, ect.)'
      }
    ]
  },
  {
    category: 'Bicycling',
    exercises: [
      {
        code: '1003',
        mets: '14.0',
        type: 'mountain biking, vigorous'
      },
      {
        code: '1004',
        mets: '16.0',
        type: 'mountain biking, competitive, racing'
      },
      {
        code: '1008',
        mets: '8.5',
        type: 'BMX'
      },
      {
        code: '1009',
        mets: '8.5',
        type: 'mountain biking, general'
      },
      {
        code: '1010',
        mets: '4.0',
        type: '<10 mph, leisure, to work or for pleasure'
      },
      {
        code: '1013',
        mets: '5.8',
        type: 'on dirt or farm road, moderate pace'
      },
      {
        code: '1015',
        mets: '7.5',
        type: 'general'
      },
      {
        code: '1018',
        mets: '3.5',
        type: 'leisure, 5.5 mph'
      },
      {
        code: '1019',
        mets: '5.8',
        type: 'leisure, 9.4 mph'
      },
      {
        code: '1020',
        mets: '6.8',
        type: '10-11.9 mph, leisure, slow, light effort'
      },
      {
        code: '1030',
        mets: '8.0',
        type: '12-13.9 mph, leisure, moderate effort'
      },
      {
        code: '1040',
        mets: '10.0',
        type: '14-15.9 mph, racing or leisure, fast, vigorous effort'
      },
      {
        code: '1050',
        mets: '12.0',
        type:
          '16-19 mph, racing/not drafting or > 19 mph drafting, very fast, racing general'
      },
      {
        code: '1060',
        mets: '15.8',
        type: '> 20 mph, racing, not drafting'
      },
      {
        code: '1065',
        mets: '8.5',
        type: '12 mph, seated, hands on brake hoods or bar drops, 80 rpm'
      },
      {
        code: '1066',
        mets: '9.0',
        type: '12 mph, standing, hands on brake hoods, 60 rpm'
      },
      {
        code: '1070',
        mets: '5.0',
        type: 'unicycling'
      }
    ]
  },
  {
    category: 'Conditioning Exercises',
    exercises: [
      {
        code: '2001',
        mets: '2.3',
        type:
          'activity promoting video game (e.g., Wii Fit), light effort (e.g., balance, yoga)'
      },
      {
        code: '2003',
        mets: '3.8',
        type:
          'activity promoting video game (e.g., Wii Fit), moderate effort (e.g., aerobic, resistance)'
      },
      {
        code: '2005',
        mets: '7.2',
        type:
          'activity promoting video game (e.g., Exergaming, Dance Dance Revolution), vigorous effort'
      },
      {
        code: '2008',
        mets: '5.0',
        type: 'army type obstacle course exercise, boot camp training program '
      },
      {
        code: '2010',
        mets: '7.0',
        type: 'stationary bike, general'
      },
      {
        code: '2011',
        mets: '3.5',
        type: 'stationary bike, 30-50 watts, very light to light effort'
      },
      {
        code: '2012',
        mets: '6.8',
        type: 'stationary bike, 90-100 watts, moderate to vigorous effort'
      },
      {
        code: '2013',
        mets: '8.8',
        type: 'stationary bike, 101-160 watts, vigorous effort'
      },
      {
        code: '2014',
        mets: '11.0',
        type: 'stationary bike, 161-200 watts, vigorous effort'
      },
      {
        code: '2015',
        mets: '14.0',
        type: 'stationary bike, 201-270 watts, very vigorous effort'
      },
      {
        code: '2017',
        mets: '4.8',
        type: 'stationary bike, 51-89 watts, light-to-moderate effort '
      },
      {
        code: '2019',
        mets: '8.5',
        type: 'stationary bike, RPM/Spin bike class '
      },
      {
        code: '2020',
        mets: '8.0',
        type:
          'calisthenics (e.g., push ups, sit ups, jumping jacks), vigorous effort'
      },
      {
        code: '2022',
        mets: '3.8',
        type:
          'calisthenics (e.g., push ups, sit ups, jumping jacks), moderate effort'
      },
      {
        code: '2024',
        mets: '2.8',
        type:
          'calisthenics (e.g., push ups, sit ups, jumping jacks), light effort'
      },
      {
        code: '2035',
        mets: '4.3',
        type: 'circuit training, moderate effort'
      },
      {
        code: '2040',
        mets: '8.0',
        type:
          'circuit training, including kettlebells, some aerobic movement with minimal rest, general, vigorous intensity'
      },
      {
        code: '2045',
        mets: '3.5',
        type: 'CurvesTM exercise routines for women'
      },
      {
        code: '2048',
        mets: '5.0',
        type: 'Elliptical trainer, moderate effort'
      },
      {
        code: '2050',
        mets: '6.0',
        type:
          'resistance training (weight lifting, free weight, nautilus or universal), power lifting or body building, vigorous effort'
      },
      {
        code: '2052',
        mets: '5.0',
        type: 'resistance (weight) training, squats, slow or explosive effort'
      },
      {
        code: '2054',
        mets: '3.5',
        type:
          'resistance (weight) training, multiple exercises, 8-15 repetitions at varied resistance '
      },
      {
        code: '2060',
        mets: '5.5',
        type: 'health club exercise, general'
      },
      {
        code: '2061',
        mets: '5.0',
        type:
          'health club exercise classes, general, gym/weight training combined in one visit'
      },
      {
        code: '2062',
        mets: '7.8',
        type: 'health club exercise, conditioning classes'
      },
      {
        code: '2065',
        mets: '9.0',
        type: 'stair-treadmill ergometer, general'
      },
      {
        code: '2068',
        mets: '12.3',
        type: 'rope skipping, general'
      },
      {
        code: '2070',
        mets: '6.0',
        type: 'rowing, stationary ergometer, general, vigorous effort'
      },
      {
        code: '2071',
        mets: '4.8',
        type: 'rowing, stationary, general, moderate effort'
      },
      {
        code: '2072',
        mets: '7.0',
        type: 'rowing, stationary, 100 watts, moderate effort'
      },
      {
        code: '2073',
        mets: '8.5',
        type: 'rowing, stationary, 150 watts, vigorous effort'
      },
      {
        code: '2074',
        mets: '12.0',
        type: 'rowing, stationary, 200 watts, very vigorous effort'
      },
      {
        code: '2080',
        mets: '6.8',
        type: 'ski machine, general'
      },
      {
        code: '2085',
        mets: '11.0',
        type: 'slide board exercise, general '
      },
      {
        code: '2090',
        mets: '6.0',
        type: 'slimnastics, jazzercise'
      },
      {
        code: '2101',
        mets: '2.3',
        type: 'stretching, mild'
      },
      {
        code: '2105',
        mets: '3.0',
        type: 'pilates, general '
      },
      {
        code: '2112',
        mets: '2.8',
        type: 'therapeutic exercise ball, Fitball exercise '
      },
      {
        code: '2115',
        mets: '2.8',
        type: 'upper body exercise, arm ergometer '
      },
      {
        code: '2117',
        mets: '4.3',
        type:
          'upper body exercise, stationary bicycle - Airdyne (arms only) 40 rpm, moderate '
      },
      {
        code: '2140',
        mets: '2.3',
        type:
          'video exercise workouts, TV conditioning programs (e.g., yoga, stretching), light effort'
      },
      {
        code: '2143',
        mets: '4.0',
        type:
          'video exercise workouts, TV conditioning programs (e.g., cardio-resistance), moderate effort'
      },
      {
        code: '2146',
        mets: '6.0',
        type:
          'video exercise workouts, TV conditioning programs (e.g., cardio-resistance), vigorous effort'
      },
      {
        code: '2150',
        mets: '2.5',
        type: 'yoga, Hatha '
      },
      {
        code: '2160',
        mets: '4.0',
        type: 'yoga, Power '
      },
      {
        code: '2170',
        mets: '2.0',
        type: 'yoga, Nadisodhana '
      },
      {
        code: '2180',
        mets: '3.3',
        type: 'yoga, Surya Namaskar'
      }
    ]
  },
  {
    category: 'Aerobics',
    exercises: [
      {
        code: '3015',
        mets: '7.3',
        type: 'general aerobics'
      },
      {
        code: '3016',
        mets: '7.5',
        type: 'step, with 6 - 8 inch step'
      },
      {
        code: '3017',
        mets: '9.5',
        type: 'step, with 10 - 12 inch step'
      },
      {
        code: '3018',
        mets: '5.5',
        type: 'step, with 4-inch step '
      },
      {
        code: '3019',
        mets: '8.5',
        type: 'bench step class, general '
      },
      {
        code: '3020',
        mets: '5.0',
        type: 'low impact'
      },
      {
        code: '3021',
        mets: '7.3',
        type: 'high impact'
      },
      {
        code: '3022',
        mets: '10.0',
        type: 'aerobic dance wearing 10-15 lb weights '
      }
    ]
  },
  {
    category: 'Running',
    exercises: [
      {
        code: '12010',
        mets: '6.0',
        type: 'jog/walk combination (jogging component of less than 10 minutes)'
      },
      {
        code: '12020',
        mets: '7.0',
        type: 'jogging, general'
      },
      {
        code: '12025',
        mets: '8.0',
        type: 'jogging in place'
      },
      {
        code: '12027',
        mets: '4.5',
        type: 'jogging on a mini-tramp'
      },
      {
        code: '12029',
        mets: '6.0',
        type: '4 mph (15 min/mile) '
      },
      {
        code: '12030',
        mets: '8.3',
        type: '5 mph (12 min/mile)'
      },
      {
        code: '12040',
        mets: '9.0',
        type: '5.2 mph (11.5 min/mile)'
      },
      {
        code: '12050',
        mets: '9.8',
        type: '6 mph (10 min/mile)'
      },
      {
        code: '12060',
        mets: '10.5',
        type: '6.7 mph (9 min/mile)'
      },
      {
        code: '12070',
        mets: '11.0',
        type: '7 mph (8.5 min/mile)'
      },
      {
        code: '12080',
        mets: '11.5',
        type: '7.5 mph (8 min/mile)'
      },
      {
        code: '12090',
        mets: '11.8',
        type: '8 mph (7.5 min/mile)'
      },
      {
        code: '12100',
        mets: '12.3',
        type: '8.6 mph (7 min/mile)'
      },
      {
        code: '12110',
        mets: '12.8',
        type: '9 mph (6.5 min/mile)'
      },
      {
        code: '12120',
        mets: '14.5',
        type: '10 mph (6 min/mile)'
      },
      {
        code: '12130',
        mets: '16.0',
        type: '11 mph (5.5 min/mile)'
      },
      {
        code: '12132',
        mets: '19.0',
        type: '12 mph (5 min/mile) '
      },
      {
        code: '12134',
        mets: '19.8',
        type: '13 mph (4.6 min/mile)'
      },
      {
        code: '12135',
        mets: '23.0',
        type: '14 mph (4.3 min/mile) '
      },
      {
        code: '12140',
        mets: '9.0',
        type: 'cross country'
      },
      {
        code: '12170',
        mets: '15.0',
        type: 'stairs, up'
      },
      {
        code: '12180',
        mets: '10.0',
        type: 'on a track, team practice'
      },
      {
        code: '12190',
        mets: '8.0',
        type: 'training, pushing a wheelchair or baby carrier'
      },
      {
        code: '12200',
        mets: '13.3',
        type: 'marathon'
      }
    ]
  },
  {
    category: 'Sports',
    exercises: [
      {
        code: '15000',
        mets: '5.5',
        type: 'Alaska Native Games, Eskimo Olympics, general '
      },
      {
        code: '15010',
        mets: '4.3',
        type: 'archery, non-hunting'
      },
      {
        code: '15020',
        mets: '7.0',
        type: 'badminton, competitive'
      },
      {
        code: '15030',
        mets: '5.5',
        type: 'badminton, social singles and doubles, general'
      },
      {
        code: '15040',
        mets: '8.0',
        type: 'basketball, game'
      },
      {
        code: '15050',
        mets: '6.0',
        type: 'basketball, non-game, general'
      },
      {
        code: '15055',
        mets: '6.5',
        type: 'basketball, general '
      },
      {
        code: '15060',
        mets: '7.0',
        type: 'basketball, officiating'
      },
      {
        code: '15070',
        mets: '4.5',
        type: 'basketball, shooting baskets'
      },
      {
        code: '15072',
        mets: '9.3',
        type: 'basketball, drills, practice '
      },
      {
        code: '15075',
        mets: '7.8',
        type: 'basketball, wheelchair'
      },
      {
        code: '15092',
        mets: '3.8',
        type: 'bowling, indoor, bowling alley '
      },
      {
        code: '15100',
        mets: '12.8',
        type: 'boxing, in ring, general'
      },
      {
        code: '15110',
        mets: '5.5',
        type: 'boxing, punching bag'
      },
      {
        code: '15120',
        mets: '7.8',
        type: 'boxing, sparring'
      },
      {
        code: '15130',
        mets: '7.0',
        type: 'broomball'
      },
      {
        code: '15138',
        mets: '6.0',
        type: 'cheerleading, gymnastic moves, competitive '
      },
      {
        code: '15150',
        mets: '4.8',
        type: 'cricket, batting, bowling, fielding'
      },
      {
        code: '15160',
        mets: '3.3',
        type: 'croquet'
      },
      {
        code: '15170',
        mets: '4.0',
        type: 'curling'
      },
      {
        code: '15180',
        mets: '2.5',
        type: 'darts, wall or lawn'
      },
      {
        code: '15190',
        mets: '6.0',
        type: 'drag racing, pushing or driving a car'
      },
      {
        code: '15192',
        mets: '8.5',
        type: 'auto racing, open wheel'
      },
      {
        code: '15200',
        mets: '6.0',
        type: 'fencing'
      },
      {
        code: '15210',
        mets: '8.0',
        type: 'football, competitive'
      },
      {
        code: '15230',
        mets: '8.0',
        type: 'football, touch, flag, general'
      },
      {
        code: '15232',
        mets: '4.0',
        type: 'football, touch, flag, light effort'
      },
      {
        code: '15235',
        mets: '2.5',
        type: 'football or baseball, playing catch'
      },
      {
        code: '15240',
        mets: '3.0',
        type: 'frisbee playing, general'
      },
      {
        code: '15250',
        mets: '8.0',
        type: 'frisbee, ultimate'
      },
      {
        code: '15255',
        mets: '4.8',
        type: 'golf, general'
      },
      {
        code: '15265',
        mets: '4.3',
        type: 'golf, walking, carrying clubs'
      },
      {
        code: '15270',
        mets: '3.0',
        type: 'golf, miniature, driving range'
      },
      {
        code: '15285',
        mets: '5.3',
        type: 'golf, walking, pulling clubs '
      },
      {
        code: '15290',
        mets: '3.5',
        type: 'golf, using power cart'
      },
      {
        code: '15300',
        mets: '3.8',
        type: 'gymnastics, general'
      },
      {
        code: '15310',
        mets: '4.0',
        type: 'hacky sack'
      },
      {
        code: '15320',
        mets: '12.0',
        type: 'handball, general'
      },
      {
        code: '15330',
        mets: '8.0',
        type: 'handball, team'
      },
      {
        code: '15335',
        mets: '4.0',
        type: 'high ropes course, multiple elements'
      },
      {
        code: '15340',
        mets: '3.5',
        type: 'hang gliding'
      },
      {
        code: '15350',
        mets: '7.8',
        type: 'hockey, field'
      },
      {
        code: '15360',
        mets: '8.0',
        type: 'hockey, ice, general'
      },
      {
        code: '15362',
        mets: '10.0',
        type: 'hockey, ice, competitive'
      },
      {
        code: '15370',
        mets: '5.5',
        type: 'horseback riding, general'
      },
      {
        code: '15390',
        mets: '5.8',
        type: 'horseback riding, trotting'
      },
      {
        code: '15395',
        mets: '7.3',
        type: 'horseback riding, canter or gallop '
      },
      {
        code: '15400',
        mets: '3.8',
        type: 'horseback riding,walking'
      },
      {
        code: '15402',
        mets: '9.0',
        type: 'horseback riding, jumping '
      },
      {
        code: '15408',
        mets: '1.8',
        type: 'horse cart, driving, standing or sitting'
      },
      {
        code: '15410',
        mets: '3.0',
        type: 'horseshoe pitching, quoits'
      },
      {
        code: '15420',
        mets: '12.0',
        type: 'jai alai'
      },
      {
        code: '15425',
        mets: '5.3',
        type: 'martial arts, slower pace, novice performers, practice'
      },
      {
        code: '15430',
        mets: '10.3',
        type: 'martial arts, moderate pace'
      },
      {
        code: '15440',
        mets: '4.0',
        type: 'juggling'
      },
      {
        code: '15450',
        mets: '7.0',
        type: 'kickball'
      },
      {
        code: '15460',
        mets: '8.0',
        type: 'lacrosse'
      },
      {
        code: '15465',
        mets: '3.3',
        type: 'lawn bowling, bocce ball, outdoor'
      },
      {
        code: '15470',
        mets: '4.0',
        type: 'moto-cross, off-road motor sports, all-terrain vehicle, general'
      },
      {
        code: '15480',
        mets: '9.0',
        type: 'orienteering'
      },
      {
        code: '15490',
        mets: '10.0',
        type: 'paddleball, competitive'
      },
      {
        code: '15500',
        mets: '6.0',
        type: 'paddleball, casual, general'
      },
      {
        code: '15510',
        mets: '8.0',
        type: 'polo, on horseback'
      },
      {
        code: '15520',
        mets: '10.0',
        type: 'racquetball, competitive'
      },
      {
        code: '15530',
        mets: '7.0',
        type: 'racquetball, general'
      },
      {
        code: '15533',
        mets: '8.0',
        type: 'rock or mountain climbing'
      },
      {
        code: '15535',
        mets: '7.5',
        type: 'rock climbing, ascending rock, high difficulty'
      },
      {
        code: '15537',
        mets: '5.8',
        type:
          'rock climbing, ascending or traversing rock, low-to-moderate difficulty '
      },
      {
        code: '15540',
        mets: '5.0',
        type: 'rock climbing, rappelling'
      },
      {
        code: '15542',
        mets: '4.0',
        type: 'rodeo sports, general, light effort'
      },
      {
        code: '15544',
        mets: '5.5',
        type: 'rodeo sports, general, moderate effort'
      },
      {
        code: '15546',
        mets: '7.0',
        type: 'rodeo sports, general, vigorous effort'
      },
      {
        code: '15550',
        mets: '12.3',
        type: 'rope jumping, fast pace, 120-160 skips/min'
      },
      {
        code: '15551',
        mets: '11.8',
        type:
          'rope jumping, moderate pace, 100-120 skips/min, general,  2 foot skip, plain bounce'
      },
      {
        code: '15552',
        mets: '8.8',
        type:
          'rope jumping, slow pace, < 100 skips/min, 2 foot skip, rhythm bounce'
      },
      {
        code: '15560',
        mets: '8.3',
        type: 'rugby, union, team, competitive'
      },
      {
        code: '15562',
        mets: '6.3',
        type: 'rugby, touch, non-competitive'
      },
      {
        code: '15570',
        mets: '3.0',
        type: 'shuffleboard'
      },
      {
        code: '15580',
        mets: '5.0',
        type: 'skateboarding, general, moderate effort'
      },
      {
        code: '15582',
        mets: '6.0',
        type: 'skateboarding, competitive, vigorous effort '
      },
      {
        code: '15590',
        mets: '7.0',
        type: 'skating, roller'
      },
      {
        code: '15591',
        mets: '7.5',
        type:
          'rollerblading, in-line skating, 14.4 km/h (9.0 mph), recreational pace'
      },
      {
        code: '15592',
        mets: '9.8',
        type:
          'rollerblading, in-line skating, 17.7 km/h (11.0 mph), moderate pace, exercise training'
      },
      {
        code: '15593',
        mets: '12.3',
        type:
          'rollerblading, in-line skating, 21.0 to 21.7 km/h (13.0 to 13.6 mph), fast pace, exercise training'
      },
      {
        code: '15594',
        mets: '14.0',
        type:
          'rollerblading, in-line skating, 24.0 km/h (15.0 mph), maximal effort'
      },
      {
        code: '15600',
        mets: '3.5',
        type: 'skydiving, base jumping, bungee jumping '
      },
      {
        code: '15605',
        mets: '10.0',
        type: 'soccer, competitive'
      },
      {
        code: '15610',
        mets: '7.0',
        type: 'soccer, casual, general'
      },
      {
        code: '15620',
        mets: '5.0',
        type: 'softball or baseball, fast or slow pitch, general'
      },
      {
        code: '15625',
        mets: '4.0',
        type: 'softball, practice '
      },
      {
        code: '15630',
        mets: '4.0',
        type: 'softball, officiating'
      },
      {
        code: '15640',
        mets: '6.0',
        type: 'softball,pitching'
      },
      {
        code: '15650',
        mets: '12.0',
        type: 'squash'
      },
      {
        code: '15652',
        mets: '7.3',
        type: 'squash, general '
      },
      {
        code: '15660',
        mets: '4.0',
        type: 'table tennis, ping pong'
      },
      {
        code: '15670',
        mets: '3.0',
        type: 'tai chi, qi gong, general'
      },
      {
        code: '15672',
        mets: '1.5',
        type: 'tai chi, qi gong, sitting, light effort'
      },
      {
        code: '15675',
        mets: '7.3',
        type: 'tennis, general'
      },
      {
        code: '15680',
        mets: '6.0',
        type: 'tennis, doubles'
      },
      {
        code: '15685',
        mets: '4.5',
        type: 'tennis, doubles'
      },
      {
        code: '15690',
        mets: '8.0',
        type: 'tennis, singles'
      },
      {
        code: '15695',
        mets: '5.0',
        type: 'tennis, hitting balls, non-game play, moderate effort '
      },
      {
        code: '15700',
        mets: '3.5',
        type: 'trampoline, recreational'
      },
      {
        code: '15702',
        mets: '4.5',
        type: 'trampoline, competitive'
      },
      {
        code: '15710',
        mets: '4.0',
        type: 'volleyball'
      },
      {
        code: '15711',
        mets: '6.0',
        type: 'volleyball, competitive, in gymnasium'
      },
      {
        code: '15720',
        mets: '3.0',
        type: 'volleyball, non-competitive, 6 - 9 member team, general'
      },
      {
        code: '15725',
        mets: '8.0',
        type: 'volleyball, beach, in sand'
      },
      {
        code: '15730',
        mets: '6.0',
        type: 'wrestling (one match = 5 minutes)'
      },
      {
        code: '15731',
        mets: '7.0',
        type: 'wallyball, general'
      },
      {
        code: '15732',
        mets: '4.0',
        type: 'track and field (e.g., shot, discus, hammer throw)'
      },
      {
        code: '15733',
        mets: '6.0',
        type:
          'track and field (e.g., high jump, long jump, triple jump, javelin, pole vault)'
      },
      {
        code: '15734',
        mets: '10.0',
        type: 'track and field (e.g., steeplechase, hurdles)'
      }
    ]
  },
  {
    category: 'Walking',
    exercises: [
      {
        code: '17010',
        mets: '7.0',
        type: 'backpacking'
      },
      {
        code: '17012',
        mets: '7.8',
        type: 'backpacking, hiking or organized walking with a daypack'
      },
      {
        code: '17020',
        mets: '5.0',
        type:
          'carrying 15 pound load (e.g. suitcase), level ground or downstairs'
      },
      {
        code: '17021',
        mets: '2.3',
        type: 'carrying 15 lb child, slow walking'
      },
      {
        code: '17025',
        mets: '8.3',
        type: 'carrying load upstairs, general'
      },
      {
        code: '17026',
        mets: '5.0',
        type: 'carrying 1 to 15 lb load, upstairs'
      },
      {
        code: '17027',
        mets: '6.0',
        type: 'carrying 16 to 24 lb load, upstairs'
      },
      {
        code: '17028',
        mets: '8.0',
        type: 'carrying 25 to 49 lb load, upstairs'
      },
      {
        code: '17029',
        mets: '10.0',
        type: 'carrying 50 to 74 lb load, upstairs'
      },
      {
        code: '17030',
        mets: '12.0',
        type: 'carrying > 74 lb load, upstairs'
      },
      {
        code: '17031',
        mets: '3.5',
        type: 'loading /unloading a car, implied walking'
      },
      {
        code: '17033',
        mets: '6.3',
        type: 'climbing hills, no load'
      },
      {
        code: '17035',
        mets: '6.5',
        type: 'climbing hills with 0 to 9 lb load'
      },
      {
        code: '17040',
        mets: '7.3',
        type: 'climbing hills with 10 to 20 lb load'
      },
      {
        code: '17050',
        mets: '8.3',
        type: 'climbing hills with 21 to 42 lb load'
      },
      {
        code: '17060',
        mets: '9.0',
        type: 'climbing hills with 42+ lb load'
      },
      {
        code: '17070',
        mets: '3.5',
        type: 'descending stairs'
      },
      {
        code: '17080',
        mets: '6.0',
        type: 'hiking, cross country'
      },
      {
        code: '17082',
        mets: '5.3',
        type: 'hiking or walking at a normal pace through fields and hillsides '
      },
      {
        code: '17088',
        mets: '4.5',
        type: 'marching, moderate speed, military, no pack'
      },
      {
        code: '17090',
        mets: '8.0',
        type: 'marching rapidly, military, no pack'
      },
      {
        code: '17100',
        mets: '4.0',
        type:
          'pushing or pulling stroller with child or walking with children, 2.5 to 3.1 mph'
      },
      {
        code: '17105',
        mets: '3.8',
        type: 'pushing a wheelchair, non-occupational '
      },
      {
        code: '17110',
        mets: '6.5',
        type: 'race walking'
      },
      {
        code: '17130',
        mets: '8.0',
        type: 'stair climbing, using or climbing up ladder'
      },
      {
        code: '17133',
        mets: '4.0',
        type: 'stair climbing, slow pace'
      },
      {
        code: '17134',
        mets: '8.8',
        type: 'stair climbing, fast pace'
      },
      {
        code: '17151',
        mets: '2.0',
        type: 'less than 2.0 mph, level, strolling, very slow'
      },
      {
        code: '17152',
        mets: '2.8',
        type: '2.0 mph, level, slow pace, firm surface'
      },
      {
        code: '17170',
        mets: '3.0',
        type: '2.5 mph, level, firm surface'
      },
      {
        code: '17180',
        mets: '3.3',
        type: '2.5 mph, downhill'
      },
      {
        code: '17190',
        mets: '3.5',
        type: '2.8 to 3.2 mph, level, moderate pace, firm surface'
      },
      {
        code: '17200',
        mets: '4.3',
        type: '3.5 mph, level, brisk, firm surface, walking for exercise'
      },
      {
        code: '17210',
        mets: '5.3',
        type: '2.9 to 3.5 mph, uphill, 1 to 5% grade'
      },
      {
        code: '17211',
        mets: '8.0',
        type: '2.9 to 3.5 mph, uphill, 6% to 15% grade'
      },
      {
        code: '17220',
        mets: '5.0',
        type: '4.0 mph, level, firm surface, very brisk pace'
      },
      {
        code: '17230',
        mets: '7.0',
        type: '4.5 mph, level, firm surface, very, very brisk'
      },
      {
        code: '17231',
        mets: '8.3',
        type: '5.0 mph, level, firm surface'
      },
      {
        code: '17235',
        mets: '9.8',
        type: '5.0 mph, uphill, 3% grade'
      },
      {
        code: '17250',
        mets: '3.5',
        type: 'for pleasure, work break'
      },
      {
        code: '17260',
        mets: '4.8',
        type: 'grass track'
      },
      {
        code: '17262',
        mets: '4.5',
        type: 'normal pace, plowed field or sand '
      },
      {
        code: '17302',
        mets: '4.8',
        type:
          'for exercise, 3.5 to 4 mph, with ski poles, Nordic walking, level, moderate pace '
      },
      {
        code: '17305',
        mets: '9.5',
        type:
          'for exercise, 5.0 mph, with ski poles, Nordic walking, level, fast pace '
      },
      {
        code: '17310',
        mets: '6.8',
        type: 'for exercise, with ski poles, Nordic walking, uphill'
      },
      {
        code: '17320',
        mets: '6.0',
        type: 'backwards, 3.5 mph, level '
      },
      {
        code: '17325',
        mets: '8.0',
        type: 'backwards, 3.5 mph, uphill, 5% grade'
      }
    ]
  },
  {
    category: 'Water Activities',
    exercises: [
      {
        code: '18040',
        mets: '2.8',
        type: 'canoeing, rowing, 2.0-3.9 mph, light effort'
      },
      {
        code: '18050',
        mets: '5.8',
        type: 'canoeing, rowing, 4.0-5.9 mph, moderate effort'
      },
      {
        code: '18060',
        mets: '12.5',
        type: 'canoeing, rowing, kayaking, competition, >6 mph, vigorous effort'
      },
      {
        code: '18090',
        mets: '3.0',
        type: 'diving, springboard or platform'
      },
      {
        code: '18100',
        mets: '5.0',
        type: 'kayaking, moderate effort'
      },
      {
        code: '18110',
        mets: '4.0',
        type: 'paddle boat'
      },
      {
        code: '18150',
        mets: '6.0',
        type: 'skiing, water or wakeboarding'
      },
      {
        code: '18160',
        mets: '7.0',
        type: 'jet skiing, driving, in water'
      },
      {
        code: '18180',
        mets: '15.8',
        type: 'skindiving, fast'
      },
      {
        code: '18190',
        mets: '11.8',
        type: 'skindiving, moderate'
      },
      {
        code: '18200',
        mets: '7.0',
        type: 'skindiving, scuba diving, general'
      },
      {
        code: '18210',
        mets: '5.0',
        type: 'snorkeling'
      },
      {
        code: '18220',
        mets: '3.0',
        type: 'surfing, body or board, general'
      },
      {
        code: '18222',
        mets: '5.0',
        type: 'surfing, body or board, competitive'
      },
      {
        code: '18225',
        mets: '6.0',
        type: 'paddle boarding, standing'
      },
      {
        code: '18230',
        mets: '9.8',
        type: 'swimming laps, freestyle, fast, vigorous effort'
      },
      {
        code: '18240',
        mets: '5.8',
        type:
          'swimming laps, freestyle, front crawl, slow, light or moderate effort'
      },
      {
        code: '18250',
        mets: '9.5',
        type: 'swimming, backstroke, general, training or competition'
      },
      {
        code: '18255',
        mets: '4.8',
        type: 'swimming, backstroke, recreational'
      },
      {
        code: '18260',
        mets: '10.3',
        type: 'swimming, breaststroke, general, training or competition'
      },
      {
        code: '18265',
        mets: '5.3',
        type: 'swimming, breaststroke, recreational '
      },
      {
        code: '18270',
        mets: '13.8',
        type: 'swimming, butterfly, general'
      },
      {
        code: '18280',
        mets: '10.0',
        type: 'swimming, crawl, fast speed, ~75 yards/minute, vigorous effort'
      },
      {
        code: '18290',
        mets: '8.3',
        type: 'swimming, crawl, medium speed, ~50 yards/minute, vigorous effort'
      },
      {
        code: '18300',
        mets: '6.0',
        type: 'swimming, lake, ocean, river'
      },
      {
        code: '18320',
        mets: '7.0',
        type: 'swimming, sidestroke, general'
      },
      {
        code: '18330',
        mets: '8.0',
        type: 'swimming, synchronized'
      },
      {
        code: '18340',
        mets: '9.8',
        type: 'swimming, treading water, fast, vigorous effort'
      },
      {
        code: '18350',
        mets: '3.5',
        type: 'swimming, treading water, moderate effort, general'
      },
      {
        code: '18355',
        mets: '5.5',
        type: 'water aerobics, water calisthenics'
      },
      {
        code: '18360',
        mets: '10.0',
        type: 'water polo'
      },
      {
        code: '18365',
        mets: '3.0',
        type: 'water volleyball'
      },
      {
        code: '18366',
        mets: '9.8',
        type: 'water jogging'
      },
      {
        code: '18367',
        mets: '2.5',
        type: 'water walking, light effort, slow pace'
      },
      {
        code: '18368',
        mets: '4.5',
        type: 'water walking, moderate effort, moderate pace'
      },
      {
        code: '18369',
        mets: '6.8',
        type: 'water walking, vigorous effort, brisk pace'
      },
      {
        code: '18370',
        mets: '5.0',
        type: 'whitewater rafting, kayaking, or canoeing'
      },
      {
        code: '18380',
        mets: '5.0',
        type: 'windsurfing, not pumping for speed'
      },
      {
        code: '18385',
        mets: '11.0',
        type: 'windsurfing or kitesurfing, crossing trial'
      },
      {
        code: '18390',
        mets: '13.5',
        type: 'windsurfing, competition, pumping for speed'
      },
      {
        code: '19018',
        mets: '14.0',
        type: 'skating, ice dancing'
      },
      {
        code: '19020',
        mets: '5.5',
        type: 'skating, ice, 9 mph or less'
      },
      {
        code: '19030',
        mets: '7.0',
        type: 'skating, ice, genera'
      },
      {
        code: '19040',
        mets: '9.0',
        type: 'skating, ice, rapidly, more than 9 mph, not competitive'
      }
    ]
  },
  {
    category: 'Winter Activities',
    exercises: [
      {
        code: '19050',
        mets: '13.3',
        type: 'skating, speed, competitive'
      },
      {
        code: '19060',
        mets: '7.0',
        type: 'ski jumping, climb up carrying skis'
      },
      {
        code: '19075',
        mets: '7.0',
        type: 'skiing, general'
      },
      {
        code: '19080',
        mets: '6.8',
        type:
          'skiing, cross country, 2.5 mph, slow or light effort, ski walking'
      },
      {
        code: '19090',
        mets: '9.0',
        type:
          'skiing, cross country, 4.0-4.9 mph, moderate speed and effort, general'
      },
      {
        code: '19100',
        mets: '12.5',
        type: 'skiing, cross country, 5.0-7.9 mph, brisk speed, vigorous effort'
      },
      {
        code: '19110',
        mets: '15.0',
        type: 'skiing, cross country, >8.0 mph, elite skier, racing'
      },
      {
        code: '19130',
        mets: '15.5',
        type:
          'skiing, cross country, hard snow, uphill, maximum, snow mountaineering'
      },
      {
        code: '19135',
        mets: '13.3',
        type: 'skiing, cross-country, skating '
      },
      {
        code: '19140',
        mets: '13.5',
        type: 'skiing, cross-country, biathlon, skating technique '
      },
      {
        code: '19150',
        mets: '4.3',
        type:
          'skiing, downhill, alpine or snowboarding, light effort, active time only'
      },
      {
        code: '19160',
        mets: '5.3',
        type:
          'skiing, downhill, alpine or snowboarding, moderate effort, general, active time only'
      },
      {
        code: '19170',
        mets: '8.0',
        type: 'skiing, downhill, vigorous effort, racing'
      },
      {
        code: '19175',
        mets: '12.5',
        type: 'skiing, roller, elite racers'
      },
      {
        code: '19180',
        mets: '7.0',
        type: 'sledding, tobogganing, bobsledding, luge'
      },
      {
        code: '19190',
        mets: '5.3',
        type: 'snow shoeing, moderate effort'
      },
      {
        code: '19192',
        mets: '10.0',
        type: 'snow shoeing, vigorous effort'
      }
    ]
  }
];

import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


export default {
    namespaced: true,
    state:{
        annotations: [
            {
            id: 'a1',
            author: 'Universität Augsburg',
            projectName: 'Temperatursensor PT130',
            categories: ['temperature', 'consistent'],
            isPublic: true,
            description: 'ich bin eine Temperatursensor und messe gerne Termperaturen',
            date: new Date(),
            lastUpdated: new Date()
            },
            {
              id: 'a2',
              author: 'Siemens GmbH',
              projectName: 'Ultraschall Sensor U234',
              description: 'Ich bin ein Ultraschallsensor und verwirre gerne Fledermäuse',
              categories: ['sound', 'small'],
              isPublic: false,
              date: new Date(),
              lastUpdated: new Date()
              },
            {
              id: 'a3',
              author: 'papillo GmbH',
              projectName: 'Gassensor G123',
              description: 'Ich bin ein Gassensor und detektiere Gase - auch deine.',
              categories: ['gas', 'big'],
              isPublic: true,
              ddate: new Date(),
              lastUpdated: new Date()
              },
            {
              id: 'a4',
              author: 'MusterFirma AG',
              projectName: 'Infrarotsensore',
              description: 'Ich bin ein SInfrarotsensor und sehe was, was du nicht siehst.',
              categories: ['infrared', 'detached'],
              isPublic: false,
              date: new Date(),
              lastUpdated: new Date()
              },
            {
              id: 'a5',
              author: 'Siemens GmbH',
              projectName: 'Ultraschall Sensor U234',
              description: 'Ich bin ein Ultraschallsensor und verwirre gerne Fledermäuse',
              categories: ['sound', 'small'],
              isPublic: false,
              date: new Date(),
              lastUpdated: new Date()
              },
            {
              id: 'a6',
              author: 'papillo GmbH',
              projectName: 'Gassensor G123',
              description: 'Ich bin ein Gassensor und detektiere Gase - auch deine.',
              categories: ['gas', 'big'],
              isPublic: true,
              ddate: new Date(),
              lastUpdated: new Date()
              },
            {
              id: 'a7',
              author: 'MusterFirma AG',
              projectName: 'Infrarotsensore',
              description: 'Ich bin ein SInfrarotsensor und sehe was, was du nicht siehst.',
              categories: ['infrared', 'detached'],
              isPublic: false,
              date: new Date(),
              lastUpdated: new Date()
              },
        ]
    },
    getters,
    mutations,
    actions


}
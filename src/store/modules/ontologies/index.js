import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


export default {
    namespaced: true,
    state:{
        ontologies: [{
          id: "d5bf416f900c4f4098a502b44cd0c139",
          title: "Semantic Hardware Web Ontology",
          },
          {
            id: "absacfe416f900c4f4098a502b44cd0c139",
            title: "Web Blog Ontology",
          },
          {
            id: "qefqwerg6f900c4f4098a502b44cd0c139",
            title: "E-Commerce Product Ontology",
          },
        ],
        chosenOntology: {
            "title": "Semantic Hardware Web Ontology",
            "description": "This ontology provides the opportunity to annotate hardware components like sensors - so if you wanna annotate it then do it",
            "last_updated": "10/Sep/2021 11:37:49",
            "creation_date": "01/Sep/2021 10:34:43",
            "ontology_id": "d5bf416f900c4f4098a502b44cd0c139",
            "classes":
                {
                    "1": 
                        {   
                            "label": "pt100",
                            "comment": "This device measures temperature.",
                            "name": "Device",
                        },          
                    "3": 
                        {
                            "label": "TempCapability",
                            "name": "Capability",
                            "comment": "Capability to measure temperature",
                        },  
                    "2": 
                        {
                            "label": "measure(simpleKey, secondKey)",
                            "comment": "Command for capability measureing temp",
                            "name": "Command",
                        },
                    "4": 
                        {   
                            "label": "measureVariable",
                            "comment": "Command for capability measureing temp prim",
                            "name": "Variable",
                            
                        },
                    "6": 
                        {
                            "label": "RX",
                            "comment": "Receiving",
                            "name": "RxOrTx",
                        },
                    "7":{
                            "label": "Property",
                            "comment": "Property of certain node",
                            "name": "Property",
                    }
                },
            "relations":{
                "1431": {
                    "relation_name":"hasCommand",
                    "is_functional":"0",
                    "subjs": ["3",],
                    "objs": ["2",]    
                },
                "5145":{
                    "relation_name":"hasCapability",
                    "is_functional":"0",
                    "subjs": ["1",],
                    "objs": ["3",]
                    
                },
                "1623654":{
                    "relation_name":"hasVariables",
                    "is_functional":"0",
                    "subjs": ["2"],
                    "objs": ["4",]
                    
                },
                "15243":{
                    "relation_name":"keyContent",
                    "is_functional":"1",
                    "subjs": ["1",],
                    "objs": []
                },
                "6345":{
                    "relation_name":"variableType",
                    "is_functional":"1",
                    "subjs": ["1",],
                    "objs": []
                    
                },
                "2355":{
                    "relation_name":"isRxOrTx",
                    "is_functional":"0",
                    "subjs": ["2",],
                    "objs": ["6",],
                },
                "12356":{
                  "relation_name":"hasProperty",
                  "is_functional":"0",
                  "subjs": ["1","2","3","4","6"],
                  "objs": ["7",]
              },
            },
          "restrictions": [
              {
                  "name": "commands.variableType.exactly(1, <class 'str'>)"
              },
              {
                  "name": "commands.keyContent.exactly(1, <class 'str'>)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property)"
              },
              {
                  "name": "commands.propertyContent.exactly(1, <class 'bool'> | <class 'float'> | <class 'int'> | <class 'str'>)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property)"
              },
              {
                  "name": "commands.hasCapability.some(commands.Capability)"
              },
              {
                  "name": "commands.isRxOrTx.exactly(1, commands.RxOrTx)"
              },
              {
                  "name": "commands.hasVariables.some(commands.Variable)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property)"
              },
              {
                  "name": "commands.hasSuperCapability.max(1, commands.Capability)"
              },
              {
                  "name": "commands.hasCommand.max(2, commands.Command)"
              },
              {
                  "name": "commands.hasCommand.min(1, commands.Command)"
              },
              {
                  "name": "commands.hasSubCapability.some(commands.Capability)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property) & commands.keyContent.exactly(1, <class 'str'>) & commands.variableType.exactly(1, <class 'str'>)"
              },
              {
                  "name": "commands.Receive | commands.Transmit"
              },
              {
                  "name": "commands.hasCapability.some(commands.Capability) & commands.hasProperty.some(commands.Property)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property) & commands.hasVariables.some(commands.Variable) & commands.isRxOrTx.exactly(1, commands.RxOrTx)"
              },
              {
                  "name": "commands.hasProperty.some(commands.Property) & commands.hasSubCapability.some(commands.Capability) & commands.hasCommand.min(1, commands.Command) & commands.hasCommand.max(2, commands.Command) & commands.hasSuperCapability.max(1, commands.Capability)"
              }
          ],
          
          }
    },
    getters,
    mutations,
    actions


}
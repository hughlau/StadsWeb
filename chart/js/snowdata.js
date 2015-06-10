
function getjigoudata(title,obj,dic_idName,backUrl){

	var option = {
					    title : {
					        text: title+"相关推荐研究机构",
					        subtext: '数据来自万方软件',
					        x:'right',
					        y:'bottom'
					    },
					     series : [
					        {
					            type:'force',
					            name : "推荐研究机构",
					            ribbonType: false,
					            categories : [
					                {
					                    name: title
					                },
					                {
					                    name: '推荐研究机构',
					                    symbol: 'circle'
					                }
					            ],
					            itemStyle: {
					                normal: {
					                    label: {
					                        show: true,
					                        textStyle: {
					                            color: '#333'
					                        }
					                    },
					                    nodeStyle : {
					                        brushType : 'both',
					                        borderColor : 'rgba(255,215,0,0.4)',
					                        borderWidth : 2,
					                        color : '#99CCFF'
					                    }
					                },
					                emphasis: {
					                    label: {
					                        show: false
					                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
					                    },
					                    nodeStyle : {
					                        //r: 30
					                        //color : 'red'
					                    },
					                    linkStyle : {}
					                }
					            },
					            minRadius : 15,
					            maxRadius : 25,
					            gravity: 1.1,
					            scaling: 1.2,
					            draggable: false,
					            linkSymbol: 'arrow',
					            steps: 10,
					            coolDown: 0.9,
					            //preventOverlap: true,
					            nodes:[
					                {
					                    category:0, 
					                    name: title, 
					                    value : 25,
					                    url:'',
					                    symbolSize: 30,
					                    draggable: true,
					                    itemStyle: {
					                        normal: {
					                            label: {
					                                //position: 'right',
					                                textStyle: {
					                                    color: 'black'
					                                }
					                            }
					                        }
					                    }
					                }
					            ],
					            links : [
					                
					            ]
					        }
					    ]
					};
					
			var scaleRadius =caluteScaleRadius(obj) ;
			for (var p in obj) {
    		    if (p.indexOf("本刊编辑部")>-1) continue ;
				option.series[0].nodes.push({category:1, name: dic_idName[p.toUpperCase()] + obj[p]  ,value : getRadius(obj[p],scaleRadius),draggable: 'true',url:'jg_info.html?id='+p+'&backUrl='+backUrl});
				option.series[0].links.push({source :  dic_idName[p.toUpperCase()] + obj[p], target : title, weight :  obj[p]});	
            }		
				
			return 		option ;
}

function getRadius(value ,scale){
	var minRadius = 15 ;
	scale = Math.ceil(parseInt(value)/scale) + minRadius ;
	return scale ;
}

function caluteScaleRadius(obj) {
	var scale = 1;
	var minvalue =100000 ;
	var maxvalue =0;
	var value =0 ;
	//alert("caluteScaleRadius");
	for (var p in obj) {
		value = parseInt(obj[p]);
		//alert("value:" + value);
		if (value < minvalue)  minvalue = value ;
		if (value > maxvalue ) maxvalue = value ;
    }		
	scale = Math.ceil((maxvalue-minvalue)/10) ;
	//begin --lhc 2015年4月15日10:16:41
	if(maxvalue==minvalue){
	    scale=1;
	}
	//end --lhc 2015年4月15日10:16:41
	//alert("minvalue:" + minvalue + " -- maxvalue:" + maxvalue + " -- scale:" + scale );
	return scale ;
}

function getfawenrdata(title,obj,dic_idName,backUrl){
		var option = {
					    title : {
					        text:  title+"相关推荐研究专家",
					        subtext: '数据来自万方软件',
					        x:'right',
					        y:'bottom'
					    },
					    series : [
					        {
					            type:'force',
					            name : "推荐研究专家",
					            ribbonType: false,
					            categories : [
					                {
					                    name: title
					                },
					                {
					                    name: '推荐研究专家',
					                    symbol: 'circle'
					                }
					            ],
					            itemStyle: {
					                normal: {
					                    label: {
					                        show: true,
					                        textStyle: {
					                            color: '#333'
					                        }
					                    },
					                    nodeStyle : {
					                        brushType : 'both',
					                        borderColor : 'rgba(255,215,0,0.4)',
					                        borderWidth : 2,
					                        color : '#99CCFF'
					                    }
					                },
					                emphasis: {
					                    label: {
					                        show: false
					                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
					                    },
					                    nodeStyle : {
					                        //r: 30
					                        //color : 'red'
					                    },
					                    linkStyle : {}
					                }
					            },
					            minRadius : 15,
					            maxRadius : 25,
					            gravity: 1.1,
					            scaling: 1.2,
					            draggable: false,
					            linkSymbol: 'arrow',
					            steps: 10,
					            coolDown: 0.9,
					            //preventOverlap: true,
					            nodes:[
					                {
					                    category:0, 
					                    name: title, 
					                    value : 25,
					                    url:'',
					                    symbolSize: 30,
					                    draggable: true,
					                    itemStyle: {
					                        normal: {
					                            label: {
					                                //position: 'right',
					                                textStyle: {
					                                    color: 'black'
					                                }
					                            }
					                        }
					                    }
					                }
					            ],
					            links : [
					                
					            ]
					        }
					    ]
					};
				var scaleRadius =caluteScaleRadius(obj) ;
				// for (var p in obj) {
					// //alert(obj[p] + "--" + getRadius(obj[p],scaleRadius));
					// if (p.indexOf("本刊编辑部")>-1) continue ;
					// option.series[0].nodes.push({category:1, name: dic_idName[p.toUpperCase()] + obj[p],value : getRadius(obj[p],scaleRadius) ,draggable: 'true',url:'zj_info.html?id='+p+'&backUrl='+backUrl});
					// option.series[0].links.push({source :  dic_idName[p.toUpperCase()] + obj[p], target : title, weight :  obj[p]});	
	            // }
	        for (var p in obj) {
                if (p.indexOf("本刊编辑部")>-1) continue ;
                option.series[0].nodes.push({category:1, name: dic_idName[p.toUpperCase()] + obj[p]  ,value : getRadius(obj[p],scaleRadius),draggable: 'true',url:'zj_info.html?id='+p+'&backUrl='+backUrl});
                option.series[0].links.push({source :  dic_idName[p.toUpperCase()] + obj[p], target : title, weight :  obj[p]});    
            }       
                
			return 		option ;
}

function getxueshuhzdata(person,obj){
			var option = {
				    title : {
				        text:  "学术合作"  + person,
				        subtext: '数据来自万方软件',
				        x:'right',
				        y:'bottom'
				    },
				    series : [
				        {
				            type:'force',
				            name : "学术合作",
				            ribbonType: false,
				            categories : [
				                {
				                    name: person
				                },
				                {
				                    name: '学术合作',
				                    symbol: 'circle'
				                }
				            ],
				            itemStyle: {
				                normal: {
				                    label: {
				                        show: true,
				                        textStyle: {
				                            color: '#333'
				                        }
				                    },
				                    nodeStyle : {
				                        brushType : 'both',
				                        borderColor : 'rgba(255,215,0,0.4)',
				                        borderWidth : 2,
				                        color : '#99CCFF'
				                    }
				                },
				                emphasis: {
				                    label: {
				                        show: false
				                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
				                    },
				                    nodeStyle : {
				                        //r: 30
				                        //color : 'red'
				                    },
				                    linkStyle : {}
				                }
				            },
				            minRadius : 15,
				            maxRadius : 25,
				            gravity: 1.1,
				            scaling: 1.2,
				            draggable: false,
				            linkSymbol: 'arrow',
				            steps: 10,
				            coolDown: 0.9,
				            //preventOverlap: true,
				            nodes:[
				                {
				                    category:0, name: person, value : 25,
				                    symbolSize: 30,
				                    draggable: true,
				                    itemStyle: {
				                        normal: {
				                            label: {
				                                //position: 'right',
				                                textStyle: {
				                                    color: 'black'
				                                }
				                            }
				                        }
				                    }
				                }
				            ],
				            links : [
				                
				            ]
				        }
				    ]
				};
									
				var scaleRadius =caluteScaleRadius(obj) ;
				for (var p in obj) {
					//alert(" 合作共享   p:" + p + " obj[p]: " +  obj[p]  );
					if (p == person)	continue;
					option.series[0].nodes.push({category:1, name: p ,value : getRadius(obj[p],scaleRadius) ,draggable: 'true'});
					option.series[0].links.push({source : p , target : person, weight : 1 });	
	            }
			return 		option ;
}
//begin --lhc 2015年4月9日10:28:13
function getxueshufxdata(person,obj,backUrl){
            var option = {
                    title : {
                        text:  "学术研究方向"  + person,
                        subtext: '数据来自万方软件',
                        x:'right',
                        y:'bottom'
                    },
                    series : [
                        {
                            type:'force',
                            name : "学术研究方向",
                            ribbonType: false,
                            categories : [
                                {
                                    name: person
                                },
                                {
                                    name: '学术研究方向',
                                    symbol: 'circle'
                                }
                            ],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'
                                        }
                                    },
                                    nodeStyle : {
                                        brushType : 'both',
                                        borderColor : 'rgba(255,215,0,0.4)',
                                        borderWidth : 2,
                                        color : '#99CCFF'
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                    },
                                    nodeStyle : {
                                        //r: 30
                                        //color : 'red'
                                    },
                                    linkStyle : {}
                                }
                            },
                            minRadius : 15,
                            maxRadius : 25,
                            gravity: 1.1,
                            scaling: 1.2,
                            draggable: false,
                            linkSymbol: 'arrow',
                            steps: 10,
                            coolDown: 0.9,
                            //preventOverlap: true,
                            nodes:[
                                {
                                    category:0, name: person, value : 25,
                                    symbolSize: 30,
                                    draggable: true,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                //position: 'right',
                                                textStyle: {
                                                    color: 'black'
                                                }
                                            }
                                        }
                                    }
                                }
                            ],
                            links : [
                                
                            ]
                        }
                    ]
                };
                                    
                var scaleRadius =caluteScaleRadius(obj) ;
                for (var p in obj) {
                    //alert(" 合作共享   p:" + p + " obj[p]: " +  obj[p]  );
                    if (p == person)    continue;
                    option.series[0].nodes.push({category:1, name: p ,value : getRadius(obj[p],scaleRadius) ,draggable: 'true',url:'ztfx_info.html?name='+p+'&backUrl='+backUrl});
                    option.series[0].links.push({source : p , target : person, weight : 1 });   
                }
            return      option ;
}
//end --lhc 2015年4月9日10:28:13
function testdata(){
	var option = {
					    title : {
					        text: '推荐研究机构：大数据',
					        subtext: '数据来自人立方',
					        x:'center',
					        y:'top'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: '{a} : {b}'
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            restore : {show: true},
					            magicType: {show: true, type: ['force', 'chord']},
					            saveAsImage : {show: true}
					        }
					    },
					    legend: {
					        x: 'left',
					        data:['家人','朋友']
					    },
					    series : [
					        {
					            type:'force',
					            name : "推荐研究机构",
					            ribbonType: false,
					            categories : [
					                {
					                    name: '大数据'
					                },
					                {
					                    name: '推荐研究机构',
					                    symbol: 'diamond'
					                }
					            ],
					            itemStyle: {
					                normal: {
					                    label: {
					                        show: true,
					                        textStyle: {
					                            color: '#333'
					                        }
					                    },
					                    nodeStyle : {
					                        brushType : 'both',
					                        borderColor : 'rgba(255,215,0,0.4)',
					                        borderWidth : 1
					                    }
					                },
					                emphasis: {
					                    label: {
					                        show: false
					                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
					                    },
					                    nodeStyle : {
					                        //r: 30
					                    },
					                    linkStyle : {}
					                }
					            },
					            minRadius : 15,
					            maxRadius : 25,
					            gravity: 1.1,
					            scaling: 1.2,
					            draggable: false,
					            linkSymbol: 'arrow',
					            steps: 10,
					            coolDown: 0.9,
					            //preventOverlap: true,
					            nodes:[
					                {
					                    category:0, name: '大数据', value : 10,
					                    symbol: 'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg',
					                    symbolSize: 30,
					                    draggable: true,
					                    itemStyle: {
					                        normal: {
					                            label: {
					                                position: 'right',
					                                textStyle: {
					                                    color: 'black'
					                                }
					                            }
					                        }
					                    }
					                },
					                {category:1, name: '中国科学院',value : 2},
					                {category:1, name: '中国人民大学',value : 3},
					                {category:1, name: '中国电信集团公司',value : 3},
					                {category:1, name: '武汉大学',value : 7},
					                {category:1, name: '中国传媒大学',value : 5},
					                {category:1, name: '中国移动通信集团公司',value : 8},
					                {category:1, name: '清华大学',value : 9},
					                {category:1, name: '北京大学',value : 4}
					            ],
					            links : [
					                {source : '中国科学院', target : '大数据', weight : 1, name: '大数据-中国科学院', itemStyle: {
					                    normal: {
					                        width: 1.5,
					                        color: 'red'
					                    }
					                }},
					                {source : '中国电信集团公司', target : '大数据', weight : 2, name: '大数据-中国电信集团公司'},
					                {source : '中国人民大学', target : '大数据', weight : 1, name: '大数据-中国人民大学'},
					                {source : '中国科学院', target : '大数据', weight : 2},
					                {source : '武汉大学', target : '大数据', weight : 3, name: '大数据-武汉大学'},
					                {source : '中国传媒大学', target : '大数据', weight : 1},
					                {source : '中国移动通信集团公司', target : '大数据', weight : 6, name: '大数据-中国移动通信集团公司'},
					                {source : '清华大学', target : '大数据', weight : 1, name: '大数据-清华大学'},
					                {source : '北京大学', target : '大数据', weight : 1}
					            ]
					        }
					    ]
					};
	return option;
}

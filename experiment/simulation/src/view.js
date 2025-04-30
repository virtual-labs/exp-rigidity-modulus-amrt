(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

var rigidity_modulus_stage, exp_canvas; 

var choose_material, choose_environment, weight, pulley, fixmirror, scale, telescope_container, arrow_counter;

var calculate_scale, metal_rod, initial_scale_ypos, previous_weight, weight_count, scale_value;

var SCALE_CONST, CONVERT_CONST, PI_VALUE, INITIAL_SCALE, YPOSITION_DIFF, INITIAL_WEIGHT, INITIAL_TELESCOPE, SCALE_XPOSITION;

var INITIAL_METALROD, INITIAL_PULLEY, INITIAL_SCALE_MIRROR, INITIAL_FIXMIRROR, MIRROR_XPOSITION, INITIAL_WEIGHT_YPOS, INITIAL_WEIGHT_XPOS;

var SCALE_POINT, ANTISCALE_POINT, LINE_MAX, ROD_MAX, PULLEY_MAX, TELESCOPE_Y_MAX, MIRROR_MAX, FIXED_SCALE;

/** Arrays declarations */
var choose_material_array = []; 
var choose_environment_array = []; 
var weight_array = [];

/** Createjs shapes declarations */
var circle_mask = new createjs.Shape();
var blank_mask = new createjs.Shape();

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            rigidity_modulus_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);       
			/** Preloading the images */
			queue.loadManifest([{
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "table",
				src: "././images/table.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "copper",
				src: "././images/copper.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "aluminium",
				src: "././images/aluminium.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "brass",
				src: "././images/brass.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "iron",
				src: "././images/iron.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rod_cover",
				src: "././images/rod_cover.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "small_white_mirror",
				src: "././images/small_white_mirror.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "thread_weight_front",
				src: "././images/thread_weight_front.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "thread_weight_back",
				src: "././images/thread_weight_back.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "telescope",
				src: "././images/telescope.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_zoom",
				src: "././images/round_zoom.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "microscope",
				src: "././images/microscope.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dashed_line",
				src: "././images/dashed_line.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "microscope_adjust",
				src: "././images/microscope_adjust.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "wheel",
				src: "././images/wheel.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "up_arrow",
				src: "././images/up_arrow.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "down_arrow",
				src: "././images/down_arrow.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "weight",
				src: "././images/weight.svg",
				type: createjs.LoadQueue.IMAGE 
			}, {
				id: "scale",
				src: "././images/scale.svg",
				type: createjs.LoadQueue.IMAGE 
			}]);      
                   
            queue.on("complete", handleComplete, this);            
            loadingProgress(queue,rigidity_modulus_stage,exp_canvas.width);            
            rigidity_modulus_stage.enableDOMEvents(true);
            rigidity_modulus_stage.enableMouseOver();
            createjs.Touch.enable(rigidity_modulus_stage);
      		
			telescope_container = new createjs.Container(); /** Creating the telescope container */
			telescope_container.x = telescope_container.y = 0;
			telescope_container.name = "telescope_container";
			rigidity_modulus_stage.addChild(telescope_container); /** Append it in the stage */		
			
			dashed_line_container = new createjs.Container(); /** Creating the telescope container */
			dashed_line_container.x = dashed_line_container.y = 0;
			dashed_line_container.name = "dashed_line_container";
			rigidity_modulus_stage.addChild(dashed_line_container); /** Append it in the stage */		
			
            function handleComplete() { 
                /** Loading images, text and containers */		
				
				loadImages(queue.getResult("background"), "background", 0, 0, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("table"), "table", 0, 0, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("copper"), "copper", 350, 350, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("aluminium"), "aluminium", 350, 350, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("brass"), "brass", 350, 350, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("iron"), "iron", 350, 350, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("rod_cover"), "rod_cover", 0, 0, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("small_white_mirror"), "small_white_mirror", 450, 206, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("thread_weight_front"), "thread_weight_front", 0, 0, "", rigidity_modulus_stage); 
				loadImages(queue.getResult("thread_weight_back"), "thread_weight_back", 0, 0, "", rigidity_modulus_stage); 		
				loadImages(queue.getResult("telescope"), "telescope", 340, 0, "", telescope_container);
				loadImages(queue.getResult("microscope"), "microscope", 430, 340, "", telescope_container); 	
				loadImages(queue.getResult("microscope_adjust"), "microscope_adjust", 435, 342, "", telescope_container); 	
				loadImages(queue.getResult("up_arrow"), "up_arrow", 473, 332, "pointer", telescope_container); 
				loadImages(queue.getResult("down_arrow"), "down_arrow", 473, 362, "pointer", telescope_container); 				
				loadImages(queue.getResult("dashed_line"), "dashed_line", 89, 163, "", telescope_container); 
				loadImages(queue.getResult("dashed_line"), "dashed_line1", 89, 163, "", dashed_line_container);		
				rigidity_modulus_stage.addChild(telescope_container); /** Append it in the stage */
				rigidity_modulus_stage.addChild(dashed_line_container); /** Append it in the stage */				
				circle_mask.graphics.f("grey").dc(110,190,104); /** masking circles */
				rigidity_modulus_stage.addChild(circle_mask);
				loadImages(queue.getResult("scale"), "scale", -13, -792, "", rigidity_modulus_stage); 				
				loadImages(queue.getResult("round_zoom"), "round_zoom", 0, 0, "", rigidity_modulus_stage); 					
				loadImages(queue.getResult("wheel"), "wheel", 655, 210, "", rigidity_modulus_stage); /////////////////////////
				for(i=1; i<5; i++){
					loadImages(queue.getResult("weight"), "weight"+i, 665.5, 332+(i*5), "", rigidity_modulus_stage); 
				}
				for(i=1; i<=2; i++){
					loadImages(queue.getResult("weight"), "weight", 665.5, 348+(i*5), "", rigidity_modulus_stage); 		
				}	
                initialisationOfVariables(scope); 
                /** Function call for images used in the apparatus visibility */
                initialisationOfImages();
                /** Function call for the initial value of the controls */
                initialisationOfControls(scope);
                /** Translation of strings using gettext */
                translationLabels();
				/** Graph plotting function */
				
					/** Click event function of moving up telescope */
					telescope_container.getChildByName("up_arrow").on("click",function(){
					if(arrow_counter < 26){					
						arrow_counter++;
						/** Equation is used to increment the y-position of microscope, where 0.6 is the constant to adjust the microscope */
						telescope_container.getChildByName("microscope").y = telescope_container.getChildByName("microscope").y - 0.6;	
						/** Equation is used to increment the y-position of dashed line */
						telescope_container.getChildByName("dashed_line").y = telescope_container.getChildByName("dashed_line").y - 0.6;
						/** Giving blur effect to the scale */
						blurScale(arrow_counter,0,0,rigidity_modulus_stage.getChildByName("scale"), 231.3, 3196.7);
					}
					scope.$apply();
					rigidity_modulus_stage.update();			
				});
					/** Click event function of moving down telescope */
					telescope_container.getChildByName("down_arrow").on("click",function(){	
					if(arrow_counter > 0){			
						arrow_counter--;
						/** Equation is used to increment the y-position of microscope, where 0.6 is the constant to adjust the microscope */
						telescope_container.getChildByName("microscope").y = telescope_container.getChildByName("microscope").y + 0.6;	
						/** Equation is used to decrement the y-position of dashed line */
						telescope_container.getChildByName("dashed_line").y = telescope_container.getChildByName("dashed_line").y + 0.6;
						/** Giving blur effect to the scale */
						blurScale(arrow_counter,0,0,rigidity_modulus_stage.getChildByName("scale"), 231.3, 3196.7);
					}
					scope.$apply();
					rigidity_modulus_stage.update();				
				});
				scope.$apply();
				rigidity_modulus_stage.update();	
			}

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() { 
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("Next"), _("Close")];
                scope.heading = _("Rigidity Modulus -Static Torsion");
                scope.variables = _("Variables");
				scope.result = _("Result");
				scope.copyright = _("copyright");
				scope.show_direction = _("Anti-Clockwise");	
				scope.select_material = _("Choose material of rod");
				scope.select_environment = _("Choose environment");	
				scope.initial_material = _("Copper");
				scope.initial_environment = _("Earth g=9.8 m/s");
				scope.weight = _("Mass of weight rings");
				scope.position = _("Position of telescope");
				scope.radius = _("Adjust radius");
				scope.metalrod = _("Radius of metal rod");
				scope.pulley = _("Radius of pulley");
				scope.distance = _("Adjust distance");
				scope.scale = _("Distance between scale and mirror");
				scope.fixmirror = _("Mirror distance from the fixed end");
				scope.gram = _("kg");
				scope.millimeter = _("mm");
				scope.pulley_centimeter = _("cm");
				scope.scale_centimeter = _("cm");
				scope.fixed_centimeter = _("cm");	
				scope.reset_txt = _("Reset");	
				scope.show_result = _("Show Result");					
				/** Labels for rigidity_modulus */
				scope.rigidity_modulus = _("Rigidity modulus of copper rod, n");		
				scope.rigidity_modulus_unit = _("GPa");
				scope.cntrol_disable = true;
                scope.material_array = [{				
                    material: _('Copper'),
                    type: 45.4,
                    index: 0
                }, {
                    material: _('Aluminium'),
					type: 26.9,
					index: 1
                }, {
                    material: _('Brass'),
					type: 40.02,
					index: 2
                }, {
                    material: _('Iron'),
					type: 40.71,
					index: 3
                }];
				
				scope.environment_array = [{				
                    environment: _('Earth g=9.8 m/s'),
                    type: 1,
                    index: 0	
                }, {
                    environment: _('Moon g=1.63 m/s'),
                    type: 2,
                    index: 1
                }, {
                    environment: _('Uranus g=10.67 m/s'),
                    type: 3,
                    index: 2
                }, {
                    environment: _('Saturn g=11.08 m/s'),
                    type: 4,
                    index: 3
                }, {
                    environment: _('Jupiter g=25.95 m/s'),
                    type: 5,
                    index: 4
                }];

				scope.$apply();
				rigidity_modulus_stage.update(); /** Stage update */
            }
        }
    }
	rigidity_modulus_stage.update();
}

/** All the texts loading and added to the natural_convection_stage */
function setText(name, textX, textY, value, color, fontSize) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
	if( name=="gaussmeter_display" || name=="current_display" || name=="voltage_display" ){
		_text.font = "1.8em digiface";
	}
    _text.name = name;
    _text.text = value;
    _text.color = color;
    rigidity_modulus_stage.addChild(_text); /** Adding text to the container */
}

/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, container) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.cursor = cursor;
	/** Masking the main scale */
	if ( name == "scale"){ 
		_bitmap.mask = circle_mask;
    }
	
	/** Set the x-axis registration point of telescope */
	if(name == "telescope"){
		_bitmap.regX = _bitmap.image.width/2;
	}
	
	/** Set the y-axis registration point of wheel */
	if(name == "wheel"){
		_bitmap.regY = _bitmap.image.height/2;
	}
	
	/** Set the x-axis and y-axis registration point of select material */
	if(name == "copper" || name == "aluminium" || name == "brass" || name == "iron"){
		_bitmap.regX = _bitmap.image.width/2;
		_bitmap.regY = _bitmap.image.height/2;
	}

	container.addChild(_bitmap); /** Adding bitmap to the container */
	if ( name == "weight") {
		weight_array.push(_bitmap);
    }
	rigidity_modulus_stage.update();
}

/** Function to return child element of stage */
function getChild(child_name) {
	return rigidity_modulus_stage.getChildByName(child_name); /** Returns the child element of stage */
} 

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	/** Setting the slider value to the label variable */	
	weight = scope.mass_weight = scope.massofWeight = 0.7;
	previous_weight = weight*10;
	position = scope.telescope_position = scope.telescopePosition = 25;
	metalrod = scope.metalrod_num = scope.metalrodNum = 3;
	pulley = scope.pulley_num = scope.pulleyNum = 5;
	scale = scope.mirror_scale = scope.mirrorScale = 100;
	fixmirror = scope.fixed_mirror = scope.fixedMirror = 25;
	document.getElementById("site-sidenav").style.display = "block";
	scope.showresult = scope.showdirection = false;	
	/** Set the initial dropdown image */
	choose_material = ["copper"];
	choose_material_array = ["copper", "aluminium", "brass", "iron"];
	/** Set the initial value of dropdown environment */
	choose_environment = 9.8;
	choose_environment_array = [9.8,1.63,10.67,11.08,25.95];	
	arrow_counter = 0;
	initial_scale_ypos = -792;
	/** Constant values */
	INITIAL_WEIGHT_YPOS = 348;
	INITIAL_WEIGHT_XPOS=665.5;
	SCALE_CONST = 4;
	CONVERT_CONST = 100;
	PI_VALUE = 3.14;
	INITIAL_SCALE = 15;
	YPOSITION_DIFF = 5;
	INITIAL_WEIGHT = 0.7;
	INITIAL_TELESCOPE = 25;
	SCALE_XPOSITION = -13;
	INITIAL_METALROD = 3;
	INITIAL_PULLEY = 5;
	INITIAL_SCALE_MIRROR = 100;
	INITIAL_FIXMIRROR = 25;
	MIRROR_XPOSITION = 450;
	ANTISCALE_POINT = -60.5;
	SCALE_POINT = 61.5;
	LINE_MAX = 0.014;
	ROD_MAX = 0.002;
	PULLEY_MAX = 0.05;
	TELESCOPE_Y_MAX = 0.002;
	MIRROR_MAX = 6.2;
	FIXED_SCALE = 100;
	rigidity_modulus_stage.update();
}

/** Initialisation of all controls */
function initialisationOfControls(scope) {
	/** Setting the initial value of dropdown list */
	scope.materialModel = 45.4;
	scope.environmentModel = 1;
}

/** Set the initial status of the images and text depends on its visibility and initial values */
function initialisationOfImages(scope) {
	/** Set the initial material of rod */
	getChild("copper").visible = true;
	getChild("aluminium").visible = getChild("brass").visible = getChild("iron").visible  = false;
	/** Set the initial positions */
	getChild("small_white_mirror").x = 450;
	getChild("thread_weight_front").visible = true;
	getChild("thread_weight_back").visible = false;
	/** Used to visible the telescope_container and invisible the dashed_line_container */
	telescope_container.getChildByName("dashed_line").visible = true;
	dashed_line_container.getChildByName("dashed_line1").visible = false;
	/** Set the initial y-position of dashed line and microscope */
	telescope_container.getChildByName("dashed_line").y = 163;
	telescope_container.getChildByName("microscope").y = 340;
	getChild("scale").alpha = 1;
	getChild("scale").x = -13;
	/** Initially set the metal rod as copper */
	metal_rod = "copper";
	getChild(""+metal_rod).scaleX = getChild(""+metal_rod).scaleY = 1;
	/** Set the initial positions */
	telescope_container.x = 0;
	getChild("wheel").scaleY = 1;
	telescope_container.scaleY = telescope_container.scaleX = 1;
	getChild("scale").visible = true;
	blurScale(1,0,0,rigidity_modulus_stage.getChildByName("scale"), 231.3, 3196.7);
	rigidity_modulus_stage.update();
}

/** Reset the experiment in the reset button event */
function resetExperiment(scope) {
	initialisationOfVariables(scope);
	initialisationOfControls(scope);
	initialisationOfImages(scope);
	showResult(scope);
	showDirection(scope); 
	/** Remove the weight if the weight array length is greater than 2 */
	while(weight_array.length>2){
		removeWeight(weight_array.length-1); /** Used to remove the weight from weight array */
		weight_array.pop();		
		} 
	/** Load the weight if the weight array length is less than 2 */
	while(weight_array.length<2){
		i++;
		loadImages(queue.getResult("weight"), "weight", INITIAL_WEIGHT_XPOS, INITIAL_WEIGHT_YPOS+(YPOSITION_DIFF*i), "", rigidity_modulus_stage); 
	}
	rigidity_modulus_stage.update();
}  
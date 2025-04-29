/** Function for selecting anti-clockwise or clockwise direction */
function showDirection(scope){
	calculation(scope); /** Calculate the value from slider */		
	if(scope.showdirection){	
		/** If the rotation is anti-clockwise */ 
		/** Show the visibility of thread_weight_back and invisible the thread_weight_front */
		getChild("thread_weight_back").visible = true;
		getChild("thread_weight_front").visible = false;
		/** Set the initial x and y position of anti-clockwise direction */
		INITIAL_WEIGHT_YPOS = 335.5;
		INITIAL_WEIGHT_XPOS = 653.5;
	}else {
		/** If the rotation is clockwise */
		/** Show the visibility of thread_weight_front and invisible the thread_weight_back */
		getChild("thread_weight_back").visible = false;
		getChild("thread_weight_front").visible = true;
		/** Set the initial x and y position of clockwise direction */
		INITIAL_WEIGHT_XPOS = 665.5;
		INITIAL_WEIGHT_YPOS = 348.5;	
	}
	changeWeightPosition(scope);
	rigidity_modulus_stage.update();
}

/** Function for used to fix the position of weight depends on clockwise or anti-clockwise direction */	
function changeWeightPosition(scope){
	/** If the rotation is anti-clockwise */ 
	if(scope.showdirection){	
		/** Assign the initial x-position to the corresponding weight */
		getChild("weight1").x = getChild("weight2").x = getChild("weight3").x = getChild("weight4").x = INITIAL_WEIGHT_XPOS;
		/** Increment the y-position to the corresponding weight */
		for(i=1; i<5; i++){
			getChild("weight"+i).y = 315.5+(i*5);
		}
		for(i=0; i<weight_array.length; i++){
			/** Equation is used to increment the y-position in anti-clockwise direction, where YPOSITION_DIFF is the common difference between the weight */
			weight_array[i].y = INITIAL_WEIGHT_YPOS+((i+1)*YPOSITION_DIFF);	
			/** Assign the initial x-position to the weight array */
			weight_array[i].x = INITIAL_WEIGHT_XPOS;
			}	
		}
	else{
		/** If the rotation is clockwise */ 
		/** Assign the initial x-position to the corresponding weight */
		getChild("weight1").x = getChild("weight2").x = getChild("weight3").x = getChild("weight4").x = INITIAL_WEIGHT_XPOS;
		/** Increment the y-position to the corresponding weight */
		for(i=1; i<5; i++){
			getChild("weight"+i).y = 327.5+(i*5);
		}
		for(i=0; i<weight_array.length; i++){
			/** Equation is used to increment the y-position in anti-clockwise direction, where YPOSITION_DIFF is the common difference between the weight */
			weight_array[i].y = INITIAL_WEIGHT_YPOS+((i+1)*YPOSITION_DIFF);
			/** Assign the initial x-position to the weight array */
			weight_array[i].x = INITIAL_WEIGHT_XPOS;
			}	
		}
	rigidity_modulus_stage.update();
}

/** Dropdown list of choose material function */
function materialExperiment(scope){
	getChild("copper").visible = getChild("aluminium").visible = getChild("brass").visible = getChild("iron").visible = false;
	/** Function for check the material of the rod */
	 switch (scope.materialModel > 0) {
		case(scope.materialModel == 45.4):
			/** if the material is copper */
			getChild("copper").visible = true;
			metal_rod = "copper"; /** Select the metal rod as copper */	
		break;
		case(scope.materialModel == 26.9):
			/** if the material is aluminium */
			getChild("aluminium").visible = true;
			metal_rod = "aluminium"; /** Select the metal rod as aluminium */
		break;
		case(scope.materialModel == 40.02):
			/** if the material is brass */
			getChild("brass").visible = true;
			metal_rod = "brass"; /** Select the metal rod as brass */
		break;
		case(scope.materialModel == 40.71):
			/** if the material is iron */
			getChild("iron").visible = true;
			metal_rod = "iron"; /** Select the metal rod as iron */
		break;
	} 
	calculation(scope); /** Used to calculate the value from slider */
	
	rigidity_modulus_stage.update();
}

/** Dropdown list of choose environment function */
function environmentExperiment(scope){
	calculation(scope);
	rigidity_modulus_stage.update();
}

/** Function for weight rings slider */
function weightExperiment(scope){
	/** Setting the slider value to the label variable */
	scope.mass_weight = weight;	
	weight_count = weight*10;
	/** If the previous_weight > weight_count, then check the no of weight and remove */
	if(previous_weight > weight_count){
		for(i=previous_weight; i>weight_count; i--){
		removeWeight(weight_array.length-1); /** Used to remove the weight from weight array */
		weight_array.pop();		
		}
	}
	else {
		/** If the previous_weight < weight_count, then check the no of weight and add */
		for(i=previous_weight; i<weight_count; i++){
		loadImages(queue.getResult("weight"), "weight", INITIAL_WEIGHT_XPOS, INITIAL_WEIGHT_YPOS+(YPOSITION_DIFF*(i-YPOSITION_DIFF)), "", rigidity_modulus_stage); 
		}
	}
	previous_weight = weight_count;
	rigidity_modulus_stage.update();
}

/** Function for remove the weight from weight_array */
function removeWeight(i){
	rigidity_modulus_stage.removeChild(weight_array[i]);	
	rigidity_modulus_stage.update();
}

/** Function for set the position of telescope slider */
function telescopeExperiment(scope){
	/** Setting the slider value to the label variable */	
	position = scope.telescope_position = scope.telescopePosition;
	/** Equation is used to adjusting the position of telescope, moving to x-axis */
	telescope_container.x =((position-INITIAL_TELESCOPE)*5);
	/** Used to visible dashed line in dashed line container */
	dashed_line_container.getChildByName("dashed_line1").visible = true;
	telescope_container.getChildByName("dashed_line").visible = false;
	/** Scale the dashed line depends on the movement of telescope, where position is the slider value and LINE_MAX = 0.014 is constant to set the scale */
	dashed_line_container.getChildByName("dashed_line1").scaleX = 1 + ((position-INITIAL_TELESCOPE) * LINE_MAX); 
	/** Equation is used to set the visibility of scale at middle point, where 300 is the constant to set the scale position */
	getChild("scale").x = SCALE_XPOSITION + ((position-INITIAL_TELESCOPE)*300); 
	calculation(scope);
	rigidity_modulus_stage.update();
}

/** Function for metal rod slider */
function metalrodExperiment(scope){
	/** Setting the slider value to the label variable */	
	metalrod = scope.metalrod_num = scope.metalrodNum;
	/** Equation is used to scale the metal rod that we select, where ROD_MAX = 0.002 is the constant to set the position */
	getChild(""+metal_rod).scaleX = getChild(""+metal_rod).scaleY = 1+((metalrod-INITIAL_METALROD) * ROD_MAX);
	calculation(scope);
	rigidity_modulus_stage.update();	
}

/** Function for pulley slider */
function pulleyExperiment(scope){
	/** Setting the slider value to the label variable */	
	pulley = scope.pulley_num = scope.pulleyNum;
	/** Equation is used to scale the y-position of wheel, where PULLEY_MAX = 0.05 is the constant to set the position of wheel */
	getChild("wheel").scaleY = 1+((pulley-INITIAL_PULLEY) * PULLEY_MAX);	
	calculation(scope);
	rigidity_modulus_stage.update();
}

/** Function for scale from mirror slider */
function scalemirrorExperiment(scope){
	/** Setting the slider value to the label variable */	
	scale = scope.mirror_scale = scope.mirrorScale;	 
	dashed_line_container.getChildByName("dashed_line1").visible = true;
	telescope_container.getChildByName("dashed_line").visible = false;
	/** Equation is used to adjusting the position of telescope, moving to y-axis where TELESCOPE_Y_MAX = 0.002 is constant */
	telescope_container.scaleY = 1+((scale-INITIAL_SCALE_MIRROR) * TELESCOPE_Y_MAX);
	/** Giving blur effect to the scale */
	blurScale(scale-100,0,0,rigidity_modulus_stage.getChildByName("scale"), 231.3, 3196.7);
	calculation(scope);
	rigidity_modulus_stage.update();
}

/** Blur function */
function blurScale(blur_value,posX,posY, blur_scale_name, blur_image_width, blur_image_height){
	blur_filter = new createjs.BlurFilter(blur_value);
	blur_scale_name.filters = [blur_filter];
	blur_scale_name.cache(posX,posY, blur_image_width, blur_image_height);	
}
		
/** Function for mirror from fixed end slider */
function mirrorfixedExperiment(scope){
	/** Setting the slider value to the label variable */	
	fixmirror = scope.fixed_mirror;
	/** Equation is used to adjusting the position of small_white_mirror, where MIRROR_MAX = 6.2 is the constant to set the position of mirror */
	getChild("small_white_mirror").x = MIRROR_XPOSITION + ((fixmirror-INITIAL_FIXMIRROR) * MIRROR_MAX); 
	/** Equation is used to set the visibility of scale at middle point, where FIXED_SCALE = 100 is the constant to set the scale position */
	getChild("scale").x = SCALE_XPOSITION + ((fixmirror-INITIAL_FIXMIRROR) * FIXED_SCALE); 
	rigidity_modulus_stage.update();
}

/** Show result check box function */
function showResult(scope) {
	/** To show the result */
    ( scope.showresult == true )?scope.hide_show_result = true:scope.hide_show_result = false;        
}

/** Get the calculations from the slider */
function calculation(scope) {
	/** Equation is used to find the scale reading */
	calculate_scale = ((SCALE_CONST*weight*choose_environment*pulley*fixmirror*scale*Math.pow(10,-6)) / (PI_VALUE*Math.pow((metalrod*Math.pow(10,-3)),4)*scope.materialModel*Math.pow(10,9)))*CONVERT_CONST;
	/** If the rotation of the wheel is anti-clockwise or clock-wise */	
	scope.rigidity_modulus_value = scope.materialModel;
	if(scope.showdirection){	
		/** Equation is used to calculate the scale position, where initial_scale_ypos = -792 and anti-scale point = -60 */
		getChild("scale").y = initial_scale_ypos+ (calculate_scale * ANTISCALE_POINT); /** If the rotation is anti-clockwise */
	}
	else {
		/** Equation is used to calculate the scale position, where initial_scale_ypos = -792 and scale point = 60 */
		getChild("scale").y = initial_scale_ypos+ (calculate_scale * SCALE_POINT); /** If the rotation is clockwise */
	}
	rigidity_modulus_stage.update(); /** Used to update the stage */
}
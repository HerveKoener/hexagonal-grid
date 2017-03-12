function HexagonGrid(canvasId, ratio, depth, width){
	let c = document.getElementById(canvasId);
	this.ctx = c.getContext("2d");
	this.ratio = ratio;
	this.depth = depth;
	this.rectWidth = width;
	this.rectHeight = this.rectWidth/this.ratio;
	this.canvasWith = c.width;
	this.canvasHeight = c.height;
	this.currentY = this.canvasHeight;
};

HexagonGrid.prototype.draw = function() {
	while(this.currentY > 0 && this.rectHeight > 0 && this.rectWidth > 0){
		this.drawLine(false);
		this.drawLine(true);
		this.currentY = this.currentY-this.rectHeight/2-(this.rectHeight-this.depth)/2;
		this.rectWidth = this.rectWidth-2*this.depth;
		this.rectHeight = this.rectHeight-2*this.depth;
	}
};
HexagonGrid.prototype.drawLine = function(reverse) {
	let x = reverse?-1:1;
	
	let pointSLow = { x:this.canvasWith/2-this.rectWidth/4*x, y: this.currentY };
	let pointSMiddle = { x:this.canvasWith/2-(this.rectWidth-this.depth)/2*x, y: this.currentY-this.rectHeight/2 };
	let pointSHigh = { x:this.canvasWith/2-(this.rectWidth-2*this.depth)/4*x, y: this.currentY-this.rectHeight/2-(this.rectHeight-this.depth)/2 };

	let gardian = 0;
	while(pointSMiddle.x < this.canvasWith && pointSMiddle.x > 0 && gardian < 500){
		if(reverse){
			let pointD = pointSMiddle;
			let pointC = pointSLow;
			let pointB = { x: pointSLow.x-this.rectWidth/2, y: pointSLow.y};
			let pointA = { x: pointSMiddle.x-(this.rectWidth-this.depth), y: pointSMiddle.y};
			let pointF = { x: pointSHigh.x-(this.rectWidth-2*this.depth)/2, y: pointSHigh.y};
			let pointE = pointSHigh;
			this.drawHexagon(pointA, pointB, pointC, pointD, pointE, pointF);
			pointSLow = { x: pointB.x-this.rectWidth, y: pointSLow.y};
			pointSMiddle = { x: pointA.x-(this.rectWidth-this.depth)/2, y: pointSMiddle.y};
			pointSHigh = { x: pointF.x-(this.rectWidth-2*this.depth), y: pointSHigh.y};
			
			this.ctx.beginPath();
			this.ctx.moveTo(pointA.x,pointA.y);
			this.ctx.lineTo(pointSMiddle.x,pointSMiddle.y);
			this.ctx.closePath();
			this.ctx.stroke();
		}else{
			let pointA = pointSMiddle;
			let pointB = pointSLow;
			let pointC = { x: pointSLow.x+this.rectWidth/2, y: pointSLow.y};
			let pointD = { x: pointSMiddle.x+(this.rectWidth-this.depth), y: pointSMiddle.y};
			let pointE = { x: pointSHigh.x+(this.rectWidth-2*this.depth)/2, y: pointSHigh.y};
			let pointF = pointSHigh;
			this.drawHexagon(pointA, pointB, pointC, pointD, pointE, pointF);
			pointSLow = { x: pointC.x+this.rectWidth*x, y: pointSLow.y};
			pointSMiddle = { x: pointD.x+(this.rectWidth-this.depth)/2*x, y: pointSMiddle.y};
			pointSHigh = { x: pointE.x+(this.rectWidth-2*this.depth)*x, y: pointSHigh.y};
			
			this.ctx.beginPath();
			this.ctx.moveTo(pointD.x,pointD.y);
			this.ctx.lineTo(pointSMiddle.x,pointSMiddle.y);
			this.ctx.closePath();
			this.ctx.stroke();
		}
		gardian++;
	}
};
HexagonGrid.prototype.drawHexagon = function(pointA, pointB, pointC, pointD, pointE, pointF){
		this.ctx.beginPath();
		this.ctx.moveTo(pointA.x,pointA.y);
		this.ctx.lineTo(pointB.x,pointB.y);
		this.ctx.lineTo(pointC.x,pointC.y);
		this.ctx.lineTo(pointD.x,pointD.y);
		this.ctx.lineTo(pointE.x,pointE.y);
		this.ctx.lineTo(pointF.x,pointF.y);
		this.ctx.closePath();
		this.ctx.stroke();
};
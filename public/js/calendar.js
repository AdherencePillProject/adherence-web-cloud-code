
var Calendar = React.createClass({
	getInitialState: function() {
		return {
			month: this.props.selected.clone()
		};
	},
	
	previous: function() {
		var month = this.state.month;
		month.add(-1, "M");
		this.setState({ month: month });
	},
		
	next: function() {
		var month = this.state.month;
		month.add(1, "M");
		this.setState({ month: month });
	},
		
	select: function(day) {
		this.props.selected = day.date;
		this.forceUpdate();
	},
	
	render: function() {
		return <div>
			<div className="header">
				<i className="fa fa-angle-left" onClick={this.previous}></i>
				{this.renderMonthLabel()}
				<i className="fa fa-angle-right" onClick={this.next}></i>
			</div>
			<DayNames />
			{this.renderWeeks()}
		</div>;
	},
	
	renderWeeks: function() {
		var weeks = [],
			done = false,
			date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
			monthIndex = date.month(),
			count = 0;
			
			
		while (!done) {
			weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.select} selected={this.props.selected} />);
			date.add(1, "w");
			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
		}
		
		return weeks;
	},
	
	renderMonthLabel: function() {
		return <span>{this.state.month.format("MMMM, YYYY")}</span>;
	},
});
	
var DayNames = React.createClass({
	render: function() {
		return <div className="week names">
			<span className="day">Sun</span>
			<span className="day">Mon</span>
			<span className="day">Tue</span>
			<span className="day">Wed</span>
			<span className="day">Thu</span>
			<span className="day">Fri</span>
			<span className="day">Sat</span>
		</div>;
	}
});
	
var Week = React.createClass({
	onClick: function() {
		// haven't figure out how to animate in React, use jQuery instead
		$('#page2').animate({opacity:0}, changeViewDelay, function(){$('#page2').toggle();});
		$('#page1').animate({opacity:1}, changeViewDelay, function(){$('#page1').fadeIn();});
	},
	render: function() {
		var days = [],
			date = this.props.date,
			month = this.props.month,
			dose = [0, 100, 20, 50, 49, 81, 100];//get this month's dose progress by query date and month
			
		for (var i = 0; i < 7; i++) {
			var day = {
				name: date.format("dd").substring(0, 1),
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(new Date(), "day"),
				date: date,
				isDoseDone: dose[i] === 100,
				isDoseHalfdone: dose[i] >= 50 && dose[i] < 100,
				isDoseNotdone: dose[i] < 50
			};
			days.push(
				<span key={day.date.toString()} 
				      className={"day" + (day.isToday ? " today" : "") 
				                       + (day.isCurrentMonth ? "" : " different-month")
				                       + (day.isDoseDone ? " done" : "")
				                       + (day.isDoseHalfdone ? " halfdone" : "")
				                       + (day.isDoseNotdone ? " notdone" : "")
				                       + (day.date.isSame(this.props.selected) ? " selected" : "")}
				      // onClick={this.props.select.bind(null, day)}>
				      onClick={this.onClick}>
				      {day.number}</span>);
			date = date.clone();
			date.add(1, "d");
			
		}
		
		return <div className="week" key={days[0].toString()}>
			{days}
		</div>;
	}
});
			
React.render(<Calendar selected={moment().startOf("day")} />, document.getElementById("calendar"));


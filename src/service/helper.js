import * as moment from "moment";

export const convertDateToFromNow = (date) => {
	return moment(date).fromNow();
};

export const convertDate = (date) => {
	return moment.unix(date).format("Do MMMM YYYY, hh:mm");
};

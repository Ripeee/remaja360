import dayjs from "dayjs";
import * as React from 'react'

export default function Times () {
  const [timeNow, setTimeNow] = React.useState("");
  // const date = new Date();
  // const time = dayjs(date).format("HH:mm");
  
  React.useEffect(() => {
		const hour = dayjs().hour();
		if (hour < 11) {
			setTimeNow("Morning");
		} else if (hour < 15) {
			setTimeNow("Afternoon");
		} else if (hour < 21) {
			setTimeNow("Evening");
		} else {
			setTimeNow("Night");
		}
	}, []);
  return timeNow
}
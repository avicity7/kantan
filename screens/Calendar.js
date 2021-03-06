import React, { useState } from "react";
import { Alert, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { userEmail } from "../screens/Login";
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from "react-native-calendars";
import _ from "lodash";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const today = new Date();
const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

const EVENTS = [
  {
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: "Merge Request to React Native Calendars",
    summary: "Merge Timeline Calendar to React Native Calendars",
  },
  {
    start: `${getDate()} 01:15:00`,
    end: `${getDate()} 02:30:00`,
    title: "Meeting A",
    summary: "Summary for meeting A",
    color: "#e6add8",
  },
  {
    start: `${getDate()} 01:30:00`,
    end: `${getDate()} 02:30:00`,
    title: "Meeting B",
    summary: "Summary for meeting B",
    color: "#e6add8",
  },
  {
    start: `${getDate()} 01:45:00`,
    end: `${getDate()} 02:45:00`,
    title: "Meeting C",
    summary: "Summary for meeting C",
    color: "#e6add8",
  },
  {
    start: `${getDate()} 02:40:00`,
    end: `${getDate()} 03:10:00`,
    title: "Meeting D",
    summary: "Summary for meeting D",
    color: "#e6add8",
  },
  {
    start: `${getDate()} 02:50:00`,
    end: `${getDate()} 03:20:00`,
    title: "Meeting E",
    summary: "Summary for meeting E",
    color: "#e6add8",
  },
  {
    start: `${getDate()} 04:30:00`,
    end: `${getDate()} 05:30:00`,
    title: "Meeting F",
    summary: "Summary for meeting F",
    color: "#e6add8",
  },
  {
    start: `${getDate(1)} 00:30:00`,
    end: `${getDate(1)} 01:30:00`,
    title: "Visit Grand Mother",
    summary: "Visit Grand Mother and bring some fruits.",
    color: "#ade6d8",
  },
  {
    start: `${getDate(1)} 02:30:00`,
    end: `${getDate(1)} 03:20:00`,
    title: "Meeting with Prof. Behjet Zuhaira",
    summary: "Meeting with Prof. Behjet at 130 in her office.",
    color: "#e6add8",
  },
  {
    start: `${getDate(1)} 04:10:00`,
    end: `${getDate(1)} 04:40:00`,
    title: "Tea Time with Dr. Hasan",
    summary: "Tea Time with Dr. Hasan, Talk about Project",
  },
  {
    start: `${getDate(1)} 01:05:00`,
    end: `${getDate(1)} 01:35:00`,
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
  },
  {
    start: `${getDate(1)} 14:30:00`,
    end: `${getDate(1)} 16:30:00`,
    title: "Meeting Some Friends in ARMED",
    summary: "Arsalan, Hasnaat, Talha, Waleed, Bilal",
    color: "#d8ade6",
  },
  {
    start: `${getDate(2)} 01:40:00`,
    end: `${getDate(2)} 02:25:00`,
    title: "Meet Sir Khurram Iqbal",
    summary: "Computer Science Dept. Comsats Islamabad",
    color: "#e6bcad",
  },
  {
    start: `${getDate(2)} 04:10:00`,
    end: `${getDate(2)} 04:40:00`,
    title: "Tea Time with Colleagues",
    summary: "WeRplay",
  },
  {
    start: `${getDate(2)} 00:45:00`,
    end: `${getDate(2)} 01:45:00`,
    title: "Lets Play Apex Legends",
    summary: "with Boys at Work",
  },
  {
    start: `${getDate(2)} 11:30:00`,
    end: `${getDate(2)} 12:30:00`,
    title: "Dr. Mariana Joseph",
    summary: "3412 Piedmont Rd NE, GA 3032",
  },
  {
    start: `${getDate(4)} 12:10:00`,
    end: `${getDate(4)} 13:45:00`,
    title: "Merge Request to React Native Calendars",
    summary: "Merge Timeline Calendar to React Native Calendars",
  },
];

const Calendar = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(getDate());
  const [events, setEvents] = useState(EVENTS);
  const [eventsByDate, setEventsByDate] = useState(
    _.groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start))
  );
  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  const handleScanView = () => {
    if (userEmail == "limhong@gmail.com") {
      navigation.navigate("CreateEvent");
    } else if (userEmail == "tanjohn@gmail.com") {
      navigation.navigate("ScanEvent");
    }
  };

  const onDateChanged = (date) => {
    // console.warn('TimelineCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent = (timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      id: "draft",
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: "New Event",
      color: "#ffffff",
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [
          ...eventsByDate[timeObject.date],
          newEvent,
        ];
        setEventsByDate(eventsByDate);
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        setEventsByDate({ ...eventsByDate });
      }
    }
  };

  const approveNewEvent = (_timeString, timeObject) => {
    Alert.prompt("New Event", "Enter event title", [
      {
        text: "Cancel",
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = _.filter(
              eventsByDate[timeObject.date],
              (e) => e.id !== "draft"
            );

            setEventsByDate(eventsByDate);
          }
        },
      },
      {
        text: "Create",
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = _.find(eventsByDate[timeObject.date], {
              id: "draft",
            });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? "New Event";
              draftEvent.color = "#d8ade6";
              eventsByDate[timeObject.date] = [
                ...eventsByDate[timeObject.date],
              ];

              setEventsByDate(eventsByDate);
            }
          }
        },
      },
    ]);
  };

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    // scrollToFirst: true,
    // start: 0,
    // end: 24,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        backgroundColor: "#333",
        calendarBackground: "#333",
      }}
    >
      <ExpandableCalendar
        firstDay={1}
        leftArrowImageSource={require("../img/previous.png")}
        rightArrowImageSource={require("../img/next.png")}
        markedDates={marked}
        theme={{
          backgroundColor: "#333",
          calendarBackground: "#333",
        }}
      />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        // scrollToNow
        scrollToFirst
        initialTime={INITIAL_TIME}
        theme={{
          backgroundColor: "#333",
          calendarBackground: "#333",
        }}
      />
      <View style={styles.tabRectangle}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chats")}
            style={styles.chatIcon}
          >
            <Icon name="chat" color="#999" size={30} />
            <Text style={{ color: "#999", fontFamily: "Sora_400Regular" }}>
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleScanView} style={styles.eventIcon}>
            <Icon name="group" color="#999" size={35} />
            <Text
              style={{
                color: "#999",
                fontFamily: "Sora_400Regular",
                marginTop: -2,
              }}
            >
              Event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarIcon}
            onPress={() => navigation.navigate("Calendar")}
          >
            <Icon name="event" color="#6FB16D" size={30} />
            <Text style={{ color: "#6FB16D", fontFamily: "Sora_400Regular" }}>
              Calendar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  tabRectangle: {
    backgroundColor: "#393939",
    width: "100%",
    height: 70,
    alignItems: "center",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabContainer: {
    width: "75%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  eventIcon: {
    marginRight: -12,
    marginTop: -3,
  },
  calendarIcon: {
    marginRight: -10,
  },
});

export default Calendar;

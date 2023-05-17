import { useState, useEffect } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { addMonths } from 'date-fns';
import { appointmentApi } from 'services/BookAppointmetService';
import { BLUE, HINT } from '@constants/colors';
interface Props {
  onDayClick: (day: Date) => void;
  specialization: number;
  setAvalibleTimeRange: React.Dispatch<React.SetStateAction<any>>;
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

interface FreeSlotProps {
  doctor: {
    id: number;
    role: string;
    specialization: number;
  };
  start: string;
  end: string;
  id: number;
  title: string;
  uuid: string;
}

const useAppointmentCalendarHook = ({
  onDayClick,
  specialization,
  setAvalibleTimeRange,
  selectedDay,
  setSelectedDay,
  setSelectedDate,
}: Props) => {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState<Date>(nextMonth);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [freeSlots, setFreeSlots] = useState<FreeSlotProps[]>([]);
  const currentStyle = { backgroundColor: `${BLUE}` };
  const bookedStyle = { color: `${HINT}` };
  const { data } = appointmentApi.useGetSpecializationByIdQuery(specialization);

  useEffect(() => {
    if (specialization !== undefined && data) {
      setFreeSlots(data);
    }
  }, [specialization, data]);

  useEffect(() => {
    if (freeSlots.length === 0) {
      setSelectedDay(null);
    }
  }, [freeSlots]);

  // work with calendar
  const ThreeMothPeriod = [];
  for (let i = 0; i < 3; i++) {
    const year = today.getFullYear();
    const month = today.getMonth() + i;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      ThreeMothPeriod.push(date);
    }
  }

  // Set all time to 0 and receive the number equivalent by getTime() function
  const formattedThreeMothPeriod = ThreeMothPeriod.map((date) => {
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const formattedFreeSlots = freeSlots.map((item) => {
    const date = new Date(item.start);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const allBookedDates = formattedThreeMothPeriod.filter(
    (date) => !formattedFreeSlots.includes(date)
  );

  //array with not avalible dates
  const formattedBookedDates = allBookedDates.map((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    return new Date(year, month, day);
  });

  const isDisabled = (day: Date) => {
    return day > new Date();
  };

  const bookedDays = [
    ...formattedBookedDates,
    { before: new Date(), modifiers: { disabled: isDisabled } },
  ];

  const selectedDate = new Date(selectedDay);

  const filteredSlots = freeSlots.filter((slot) => {
    const slotDate = new Date(slot.start);
    return (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Sort all slots by time and leave only unique slots
  filteredSlots.sort((a, b) => {
    const timeA = new Date(a.start).getTime();
    const timeB = new Date(b.start).getTime();
    return timeA - timeB;
  });

  const uniqueSlots = [];
  const uniqueKeys = new Set();

  for (const slot of filteredSlots) {
    const slotDate = new Date(slot.start);

    if (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    ) {
      const key = `${slot.start}-${slot.end}`;

      if (!uniqueKeys.has(key)) {
        uniqueSlots.push({
          doctor: slot.doctor.id,
          start: slot.start,
          end: slot.end,
        });
        uniqueKeys.add(key);
      }
    }
  }

  const transformedSlots = Object.entries(uniqueSlots).map(([key, value]) => ({
    doctor: value.doctor.id,
    start: value.start,
    end: value.end,
  }));

  function formatTimeRange(startTime, endTime) {
    const start = new Date(startTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const end = new Date(endTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${start}-${end}`;
  }

  const formattedAppointments = transformedSlots.map((appointment, index) => ({
    value: Number(index + 1),
    label: formatTimeRange(appointment.start, appointment.end),
  }));

  useEffect(() => {
    if (data && specialization !== undefined) {
      setAvalibleTimeRange(formattedAppointments);
    }
  }, [selectedDay, data, specialization]);

   const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    onDayClick(day, modifiers);
    setSelectedDate(day);
  };

  const toggleState = (): void => {
    setShowCalendar(!showCalendar);
  };

  return {
    handleDayClick,
    toggleState,
    bookedDays,
    bookedStyle,
    selectedDay,
    month,
    setMonth,
    currentStyle,
    showCalendar,
    formattedAppointments,
  };
};

export default useAppointmentCalendarHook;

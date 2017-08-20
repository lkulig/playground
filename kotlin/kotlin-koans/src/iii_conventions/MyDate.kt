package iii_conventions

data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int): Comparable<MyDate> {
    override fun compareTo(other: MyDate) = when {
        year != other.year -> year - other.year
        month != other.month -> month - other.month
        else -> dayOfMonth - other.dayOfMonth
    }

}

operator fun MyDate.rangeTo(other: MyDate) = DateRange(this, other)

enum class TimeInterval {
    DAY,
    WEEK,
    YEAR
}

class DateRange(override val start: MyDate, override val endInclusive: MyDate): ClosedRange<MyDate>, Iterable<MyDate> {
    override fun iterator(): Iterator<MyDate> = DateIterator(this)

}

class DateIterator(private val dateRange: DateRange) : Iterator<MyDate> {
    var current: MyDate = dateRange.start
    override fun next(): MyDate {
        val result = current
        current = current.nextDay()
        return result
    }
    override fun hasNext(): Boolean = current <= dateRange.endInclusive
}


class RepeatedTimeInterval(val interval: TimeInterval, val number: Int)

operator fun MyDate.plus(interval: RepeatedTimeInterval) = addTimeIntervals(interval.interval, interval.number)
operator fun MyDate.plus(interval: TimeInterval) = addTimeIntervals(interval, 1)
operator fun TimeInterval.times(times: Int) = RepeatedTimeInterval(this, times)

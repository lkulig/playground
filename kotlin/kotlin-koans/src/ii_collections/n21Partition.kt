package ii_collections

fun example8() {
    val numbers = listOf(1, 3, -4, 2, -11)

    // The details (how multi-assignment works) will be explained later in the 'Conventions' task
    val (positive, negative) = numbers.partition { it > 0 }

    positive == listOf(1, 3, 2)
    negative == listOf(-4, -11)
}

// Return customers who have more undelivered orders than delivered
fun Shop.getCustomersWithMoreUndeliveredOrdersThanDelivered(): Set<Customer> = customers.filter {
    val (del, undel) = it.orders.partition { it.isDelivered }
    undel.size > del.size
    }.toSet()

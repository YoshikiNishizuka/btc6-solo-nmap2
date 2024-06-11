package com.example.BTC6_Nmap2

import java.math.BigDecimal

class ToiletRequest(
    val name:String,
    val address:String,
    val latitude: Double,
    val longitude: Double,
    val m_sum:Short,
    val w_sum:Short,
    val uni_sum:Short,
    val multi_toilet:Short,
    val wheelchair:Boolean,
    val babies:Boolean,
    val ostomate:Boolean
)

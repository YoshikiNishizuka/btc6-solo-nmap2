package com.example.BTC6_Nmap2

import java.math.BigDecimal

data class Toilet(
    val id : Long,
    val name:String,
    val address:String,
    val latitude:BigDecimal,
    val longitude:BigDecimal,
    val m_sum:Short,
    val w_sum:Short,
    val uni_sum:Short,
    val multi_toilet:Short,
    val wheelchair:Boolean,
    val babies:Boolean,
    val ostomate:Boolean
)
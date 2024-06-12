package com.example.BTC6_Nmap2

data class Toilet(
    val id: Long,
    val name:String,
    val address:String,
    val lat: Double,
    val lng: Double,
    val m_sum:Short,
    val w_sum:Short,
    val uni_sum:Short,
    val multi_toilet:Short,
    val wheelchair:Boolean,
    val babies:Boolean,
    val ostomate:Boolean
)

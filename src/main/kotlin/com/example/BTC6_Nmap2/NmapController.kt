package com.example.BTC6_Nmap2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
class NmapController (@Autowired val toiletRepository: ToiletRepository) {

    @GetMapping("/api/toilet")
    fun getLists():ResponseEntity<Array<Toilet>>{
        val res = toiletRepository.getToilettes()
        return if (res.isEmpty()){
            ResponseEntity(HttpStatus.NOT_FOUND)
        }else{
            ResponseEntity.ok(toiletRepository.getToilettes())
        }
    }

    @GetMapping("/api/toilet/{id}")
    fun getTodosID(@PathVariable("id") id: Long): Array<Toilet> {
        return toiletRepository.getToiletID(id)
    }

    @PostMapping("/api/toilet")
    fun saveToilet(@RequestBody toiletRequest: ToiletRequest): String {
        println("ポストルート通過")
        return toiletRepository.saveToilet(toiletRequest)
    }

    @DeleteMapping("/api/toilet/{id}")
    fun deleteTodo(@PathVariable("id") id: Long): ResponseEntity<Unit> {
        val isTrue = toiletRepository.getToiletID(id).size
        if (isTrue == 1) {
            println("デリートルート")
            toiletRepository.deleteToilet(id)
            return ResponseEntity.ok().build<Unit>()
        } else {
            println("404ルート")
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}
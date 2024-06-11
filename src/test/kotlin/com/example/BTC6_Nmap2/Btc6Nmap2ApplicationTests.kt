package com.example.BTC6_Nmap2

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.test.context.jdbc.Sql
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class Btc6Nmap2ApplicationTests (
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int,
){

	@Test
	fun contextLoads() {
	}

	@Test
	fun `最初のテスト`() {
		assertThat(1+2, equalTo(3))
	}

	@Test
	fun `GETリクエストはOKステータスを返す`(){
		//Localhost/api/lists　にGETリクエストを発行する
		val response = restTemplate.getForEntity("http://localhost:$port/api/lists",String::class.java)
		// レスポンスのステータスコードはOKである
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `GETリクエストはtoilettesオブジェクトのリストを返す`(){
		//リクエスト実行
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet",Array<Toilet>::class.java)
		val toilettes = response.body!!
		println("::::::::::::::::::::::::::::::::::::::::::::")
		println(toilettes)
		//取得した配列の長さが2である
		assertThat(toilettes.size, equalTo(2))
		//最初の要素の name は "田園バレー交流施設" であること
		assertThat(toilettes[0].name, equalTo("田園バレー交流施設"))
		//2番目の要素の name は "立石池" であること
		assertThat(toilettes[1].name, equalTo("立石池"))
	}

	@Test
	fun `POSTリクエストはOKステータスを返す`(){
		println("Postの実行部分通過")
		// localhost/api/listsに POSTリクエストを送る。この時のボディは{
		val request = ToiletRequest("テスト公園","テスト市",99.999999,135.555555,9,9,9,9,true,true,true )
		val response = restTemplate.postForEntity("http://localhost:$port/api/toilet",request,String::class.java)
		println("レスポンスの中身:$response")
		// レスポンスのステータスコードは OK であること。
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

}

package com.wanghgk.tourbackend.pojo;

import lombok.Data;

@Data
public class Village {
    private Integer id;
    private String province_code;
    private String province_name;
    private String city_code;
    private String city_name;
    private String county_code;
    private String county_name;
    private String town_code;
    private String town_name;
    private String village_type;
    private String village_code;
    private String village_name;

    public Village(){

    }

    public Village(Integer id,String province_code,String province_name,String city_code,String city_name,String county_code,String county_name,String town_code,String town_name,String village_type,String village_code,String village_name){
        this.id = id;
        this.province_code = province_code;
        this.province_name = province_name;
        this.city_code = city_code;
        this.city_name = city_name;
        this.county_code = county_code;
        this.county_name = county_name;
        this.town_code = town_code;
        this.town_name = town_name;
        this.village_type = village_type;
        this.village_code = village_code;
        this.village_name = village_name;
    }

    public Integer getId(){
        return id;
    }

    public String getProvince_code(){
        return province_code;
    }

    public String getProvince_name(){
        return province_name;
    }

    public String getCity_code(){
        return city_code;
    }

    public String getCity_name(){
        return city_name;
    }

    public String getCounty_code(){
        return county_code;
    }

    public String getCounty_name(){
        return county_name;
    }

    public String getTown_code(){
        return town_code;
    }

    public String getTown_name(){
        return town_name;
    }

    public String getVillage_type(){
        return village_type;
    }

    public String getVillage_code(){
        return village_code;
    }

    public String getVillage_name(){
        return village_name;
    }

}

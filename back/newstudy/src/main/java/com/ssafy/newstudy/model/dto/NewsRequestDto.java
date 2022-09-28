package com.ssafy.newstudy.model.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsRequestDto {
    private Integer page = 1;
    private Integer start_no;
    private final Integer per_page = 10;

    private Integer n_id;

    private Integer startlevel;
    private Integer endlevel;
    private Integer categoryid = 0;
    private String search;

    public void setStartlevelAndEndlevel(int startlevel, int endlevel){
        this.startlevel = startlevel;
        this.endlevel = endlevel;
    }

    public void setPage(Integer page){
        if(page == null || page == 0) {
            setPage(1);
            return;
        }
            this.page = page;
            this.start_no = (page - 1) * per_page;
    }
}
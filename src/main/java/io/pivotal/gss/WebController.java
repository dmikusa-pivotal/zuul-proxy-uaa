package io.pivotal.gss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.ZuulProperties;
import org.springframework.cloud.netflix.zuul.filters.ZuulProperties.ZuulRoute;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/api/v1")
public class WebController {
	@Autowired
	private ZuulProperties zuulProperties;
	
	@RequestMapping("uaa_servers")
	@ResponseBody
	public Map<String,List<String>> uaaServers() {
		Map<String,List<String>> data = new HashMap<>();
		for (Map.Entry<String, ZuulRoute> route : zuulProperties.getRoutes().entrySet()) {
			List<String> item = new ArrayList<>();
			Optional.of(route.getValue().getPath()).ifPresent(val -> {
				item.add((val.endsWith("/**") ? val.substring(0, val.length() - 2) : val));
			});;
			item.add(route.getValue().getUrl());
			data.put(route.getKey(), item);
		}
		return data;
	}
}

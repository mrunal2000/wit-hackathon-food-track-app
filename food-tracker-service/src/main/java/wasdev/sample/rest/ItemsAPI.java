/******************************************************************************
 * Copyright (c) 2018 IBM Corp.                                               *
 *                                                                            *
 * Licensed under the Apache License, Version 2.0 (the "License");            *
 * you may not use this file except in compliance with the License.           *
 * You may obtain a copy of the License at                                    *
 *                                                                            *
 *    http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                            *
 * Unless required by applicable law or agreed to in writing, software        *
 * distributed under the License is distributed on an "AS IS" BASIS,          *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   *
 * See the License for the specific language governing permissions and        *
 * limitations under the License.                                             *
 ******************************************************************************/
package wasdev.sample.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;

import com.google.gson.Gson;

import wasdev.sample.Item;
import wasdev.sample.store.ItemsStore;
import wasdev.sample.store.ItemsStoreFactory;

@ApplicationPath("api")
@Path("/items")
public class ItemsAPI extends Application {

    //Our database store
    ItemsStore store = ItemsStoreFactory.getInstance();


    @GET
    @Path("/")
    @Produces({"application/json"})
    public String getItems(@Context HttpServletResponse response) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        if (store == null) {
            return "[]";
        }

        List<Item> items = new ArrayList<>();
        for (Item doc : store.getAll()) {
            Item item = new Item();
            item.setId(doc.getId());
            item.setName(doc.getName());
            item.setCalorie(doc.getCalorie());
            item.setCarbonFootPrint(doc.getCarbonFootPrint());
            items.add(item);
        }
        return new Gson().toJson(items);
    }

    @OPTIONS
    @Path("/")
    public void getItemsOption(@Context HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
    }
    

}

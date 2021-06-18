/******************************************************************************
 * Copyright IBM Corp. 2018                                                   *
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
package wasdev.sample.store;

import java.util.Collection;

import wasdev.sample.Item;

/**
 * Defines the API for a ToDo store.
 *
 */
public interface ItemsStore {

    /**
     * Get the target db object.
     * 
     * @return Database.
     * @throws Exception 
     */
    public Object getDB();

  
    /**
     * Gets all Items from the store.
     * 
     * @return All Items.
     * @throws Exception 
     */
    public Collection<Item> getAll();

    /**
     * Gets an individual ToDo from the store.
     * @param id The ID of the ToDo to get.
     * @return The ToDo.
     */
    public Item get(String id);


}

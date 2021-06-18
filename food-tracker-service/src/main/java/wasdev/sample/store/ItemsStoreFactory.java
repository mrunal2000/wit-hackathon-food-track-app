/******************************************************************************
 * Copyright (c) 2017 IBM Corp.                                               *
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

public class ItemsStoreFactory {

    private static ItemsStore instance;
    static {
        // Only use MongoDB if credentials are available.
        if (VCAPHelper.getCloudCredentials("mongodb") == null &&
            (VCAPHelper.getLocalProperties("mongo.properties").getProperty("mongo_url") == null ||
             VCAPHelper.getLocalProperties("mongo.properties").getProperty("mongo_url").equals(""))) {
            CloudantItemsStore cvif = new CloudantItemsStore();
            if (cvif.getDB() != null) {
                instance = cvif;
            }
        }
        else {
            MongoDbItemsStore cvif = new MongoDbItemsStore();
            if (cvif.getDB() != null) {
                instance = cvif;
            }
        }
    }

    public static ItemsStore getInstance() {
        return instance;
    }
}

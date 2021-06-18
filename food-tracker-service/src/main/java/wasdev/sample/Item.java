/*****************************************************************************
 * Copyright IBM Corp. 2018                                                  *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License");           *
 * you may not use this file except in compliance with the License.          *
 * You may obtain a copy of the License at                                   *
 *                                                                           *
 *    http://www.apache.org/licenses/LICENSE-2.0                             *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 *****************************************************************************/
package wasdev.sample;

/**
 * Represents a Item document stored in Cloudant.
 */

public class Item {
    private String _id;
    private String _rev;
    private String id;
    private String name = null;
    private int calorie;
    private float carbonFootPrint;

    public Item() {
        this.name = "";
    }

    /**
     * Gets the ID.
     * 
     * @return The ID.
     */
    public String get_id() {
        return _id;
    }

    /**
     * Sets the ID
     * 
     * @param _id
     *            The ID to set.
     */
    public void set_id(String _id) {
        this._id = _id;
    }

    /**
     * Gets the revision of the document.
     * 
     * @return The revision of the document.
     */
    public String get_rev() {
        return _rev;
    }

    /**
     * Sets the revision.
     * 
     * @param _rev
     *            The revision to set.
     */
    public void set_rev(String _rev) {
        this._rev = _rev;
    }

    /**
     * Gets the ItemName of the document.
     * 
     * @return The name of the document.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name
     * 
     * @param name
     *            The ItemName to set.
     */
    public void setName(String visitorName) {
        this.name = visitorName;
    }

    public int getCalorie() {
        return calorie;
    }

    public void setCalorie(int calorie) {
        this.calorie = calorie;
    }

    public float getCarbonFootPrint() {
        return carbonFootPrint;
    }

    public void setCarbonFootPrint(float carbonFootPrint) {
        this.carbonFootPrint = carbonFootPrint;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

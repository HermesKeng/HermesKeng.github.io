- It only can vertical scroll only
- The cells comprising the individual items of the table are **UITableViewCell**
- A UITableView object must have an object that acts as a **data source** and an object that acts as a **delegate**
    - Data Source uses **UITableViewDataSource** protocol
    - DeleGate must adopt the **UITableViewDelegate** protocol
- There are two styles in Table view, plain and grouped.
    - Plain style : section headers and footers float above the content if the part of a complete section is visible. **A table view can have an index that appears as a bar on the right hand side of the table (for example, "A" through "Z").**
    ![Plain style example]({{ site.url }}/images/plainUITableView.PNG)
    - Grouped style : provides a default background color and a default background view for all cells. The background view provides a visual grouping for all cells in a particular section.
    ![Grouped style example]({{ site.url }}/images/groupedUITableView.PNG)
    

# UITableViewDataSource
- It is adopted by an object that mediate the applications data model for a UITableView 
- The datasource provides the UITable need to construct and modifiy content
- The data source may implement optional methods to configure various aspects of the table view and to insert, delete, and reorder rows
- Many methods take NSIndexPath objects as parameters.

# UITableViewDelegate
- Optional methods of the protocol allow the delegate to manage selections, configure section headings and footers, help to delete and reorder cells, and perform other actions.


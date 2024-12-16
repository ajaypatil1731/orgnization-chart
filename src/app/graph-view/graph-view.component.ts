import { ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import { Employee } from "../models/employee.model";
import { Store } from "@ngrx/store";
import { OrgChart } from "d3-org-chart";
import * as _ from "lodash";
import * as d3 from "d3";
import { ActivatedRoute, Router } from "@angular/router";
import { getAllReportee } from "../store/selectors/employee.selector";

@Component({
  selector: "app-graph-view",
  templateUrl: "./graph-view.component.html",
  styleUrl: "./graph-view.component.scss",
})
export class GraphViewComponent {
  @ViewChild("chartContainer", { static: true }) chartContainer!: ElementRef;
  selectedEmployee?: Employee;
  chart: any;
  data: any[] = [];
  contextMenuPosition = {
    x:0, y:0
  };
  eventRef: any = {};
  empId = '';
  constructor(
    private store: Store<{ employee: Employee[] }>, private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.empId = params['empId'] || '';
      this.store.select(getAllReportee(this.empId)).subscribe((data: Employee[]) => {
        this.data = _.cloneDeep(data);
        this.updateChart();
      });
    });
  }

  updateChart() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.data = this.data.map(item=> item.id === this.empId ? {...item, parentId: '' }: item);
    this.eventRef = {};
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(() => 342)
      .nodeHeight(() => 146)
      .initialZoom(0.8)
      .nodeContent((d: any, i: any, nodes: any) => {
        setTimeout(()=> {
          if(this.eventRef[d.data.id]) { // to avoid duplicate event binding
            return;
          }
          const nodeElement = d3.select(nodes[i]);
          const iconElement = nodeElement.node().querySelector('.context-menu-icon');
          if (iconElement ) {
            this.eventRef[d.data.id] = iconElement.addEventListener('click', this.clickEvent.bind(this, d.data));
          }
        })
        
        return `<div class="card emp-card-container">
                  <div class="card-block">
                    <div class="card-title emp-name-container">
                      <span class="emp-name">${d.data.name}</span>
                      <span class="context-menu-icon">
                        <cds-icon shape="cog"></cds-icon>
                      </span>
                    </div>
                    <div class="card-text">
                        <div class="clr-row">
                            <div class="clr-col-md-3 clr-col-sm-3">
                                <cds-icon shape="user" [solid]="true" [size]="'xxl'" class="user-icon"></cds-icon>
                            </div>
                            <div class="clr-col-md-9 clr-col-sm-9">
                                <div class="emp-designation elipsis-container">${d.data.position}</div>
                                <div class="elipsis-container">Email: <span title="${d.data.email}}">${d.data.email}}</span></div>
                                <div>Phone: ${d.data.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>`;
      })
      .onNodeClick((s: string) => this.router.navigate([], { queryParams: { empId: s }}))
      .render()
      .expandAll();
  }

  private clickEvent(data: Employee, e: PointerEvent) {
    e.stopPropagation();
    this.selectedEmployee = undefined;
    this.changeDetectorRef.detectChanges();
    this.selectedEmployee = data;
    this.contextMenuPosition.x = e.pageX;
    this.contextMenuPosition.y = e.pageY;
  }
}

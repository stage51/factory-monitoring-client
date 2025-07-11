import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "@/components/shared/asiiu/data-table";
import { columns, visibleHeaders, mobileHeaders } from "@/components/shared/asiiu/columns";
import { getPageFiveMinuteReports } from "@/components/shared/services/five-minute-report/five-minute-report-service";
import "@testing-library/jest-dom";

vi.mock("@/components/shared/services/five-minute-report/position-service", () => ({
  getPagePositions: vi.fn().mockResolvedValue({
    content: [
      {
        id: 1,
        sensorNumber: "SN12345",
        product: {
          id: 101,
          unitType: "Фасованная",
          type: "Алкогольная продукция",
          fullName: "Вино Красное",
          shortName: "Вино",
          alcCode: "123ABC",
          capacity: 0.75,
          alcVolume: 12.5,
          productVCode: "V001",
        },
        controlDate: new Date("2024-01-01T12:00:00Z"),
        vbsControl: 100,
        aControl: 10,
        percentAlc: 12.5,
        bottleCountControl: 1000,
        temperature: 20,
        mode: "Производство",
        status: "Принято в РАР",
      },
      {
        id: 2,
        sensorNumber: "SN67890",
        product: {
          id: 102,
          unitType: "Нефасованная",
          type: "Этиловый спирт",
          fullName: "Спирт медицинский",
          shortName: "Спирт",
          alcCode: "456DEF",
          capacity: 1.0,
          alcVolume: 96,
          productVCode: "V002",
        },
        controlDate: new Date("2024-02-01T12:00:00Z"),
        vbsControl: 500,
        aControl: 50,
        percentAlc: 96,
        bottleCountControl: 2000,
        temperature: 22,
        mode: "Отгрузка",
        status: "Принято в УТМ",
      },
    ],
    totalPages: 1,
    totalElements: 2,
  })
}));

describe("DataTable component", () => {
  it("отображает таблицу с данными", async () => {
    render(
      <DataTable
        columns={columns}
        visibleHeaders={visibleHeaders}
        mobileHeaders={mobileHeaders}
        taxpayerNumber={"123456789012"}
      />
    );

    await waitFor(() => {
      expect(document.querySelector(".animate-pulse")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("SN12345")).toBeInTheDocument();
      expect(screen.getByText("SN67890")).toBeInTheDocument();
    });
  });
});
